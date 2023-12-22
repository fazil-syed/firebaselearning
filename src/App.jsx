import { useEffect, useState } from "react"
import Auth from "./components/auth"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { auth, db, storage } from "./config/firebase"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

function App() {
  const [users,setUsers] = useState([])
  const [type,setType] = useState()
  const [name,setName] = useState()
  const [usn,setUSN] = useState()
  const [email,setEmail] = useState()
  const [phone,setNumber] = useState()


  const [fileUpload,setFileUpload] = useState(null)

  const [fileList,setFileList] = useState([])

  const fileListRef = ref(storage,"assignments/")
  const usersCollectionRef = collection(db,"users")




  const getFileList = ()=>{
    listAll(fileListRef).then((res)=>{
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setFileList((prev)=>[...prev,url])
        
        })
      })
    })
  }

  const getUsers = async ()=>{
    try {
      const data = await getDocs(usersCollectionRef)
      const filteredData = data.docs.map(doc=>({...doc.data(),id:doc.id}))
      setUsers(filteredData)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getUsers()
    getFileList()
  },[])

  const deleteUser = async(id)=>{
    try {
      const userDoc = doc(db,"users",id)
      await deleteDoc(userDoc)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = async()=>{
    try {
      await addDoc(usersCollectionRef,{
        email,
        name,
        phone,
        type,
        usn,
        userId : auth?.currentUser?.uid

      })
      getUsers()
    } catch (error) {
      console.error(error)
    }
  }

  const updateUser = async (id)=>{
    try {
      const userDoc = doc(db,"users",id)
      await updateDoc(userDoc,{name})
    } catch (error) {
      console.error(error)
    }
}

const uploadFile = async ()=>{
  if(!fileUpload) return;
  try {
    const fileFolderRef = ref(storage,`assignments/${fileUpload.name + v4()}`)

    await uploadBytes(fileFolderRef,fileUpload)
  } catch (error) {
    console.error(error)
  }
}


  return (
    <div>

    <Auth/>
    <br />
    <h2>Input </h2>
    <div>
      <input placeholder="Type" onChange={(e)=>setType(e.target.value)}/><br /><br />
      <input placeholder="Name" onChange={(e)=>setName(e.target.value)}/><br /><br />
      <input placeholder="USN" onChange={(e)=>setUSN(e.target.value)}/><br /><br />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br /><br />
      <input placeholder="Number" onChange={(e)=>setNumber(e.target.value)}/><br /><br />
      <button onClick={handleSubmit}> Submit</button>
    </div>
    <div>
    {users.map((user)=>(
      <div>
        <h1>{user.name}</h1>
        <button onClick={()=>deleteUser(user.id)}>Delete User</button><br />
        <input placeholder="New Name" onChange={(e)=>setName(e.target.value)}/>
        <button onClick={()=>updateUser(user.id)}>Update</button>
      </div>
    ))}
    </div>  

    <div>
      <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>
    </div>

    <div>
      {fileList.map((url)=>(<a href={url}>pdf</a>))}
    </div>
    </div>
  )
}

export default App
