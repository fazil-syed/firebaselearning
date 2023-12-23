import { useEffect, useState } from "react"
import Auth from "./components/auth"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { auth, db, storage } from "./config/firebase"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import {addClass, addStudent, addTeacher, enrollStudent} from "./config/helpers"
function App() {
  
  const [name,setName] = useState()
  const [usn,setUSN] = useState()
  const [email,setEmail] = useState()
  const [phone,setNumber] = useState()
  const [date,setDate] = useState()
  const [classname,setClassname] = useState()
  const [teacherId,setTeacherId] = useState()
  const [classId,setClassId] = useState()
  const [studentId,setStudentId] = useState()



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
    <h2>Input Student </h2>
    <div>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br /><br />
      <input placeholder="Name" onChange={(e)=>setName(e.target.value)}/><br /><br />
      <input placeholder="Number" onChange={(e)=>setNumber(e.target.value)}/><br /><br />
      <input placeholder="USN" onChange={(e)=>setUSN(e.target.value)}/><br /><br />
      <button onClick={()=>addStudent(email,phone,name,usn) }> Submit</button>
    </div>
    <h2>Input Teacher </h2>
    <div>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br /><br />
      <input placeholder="Name" onChange={(e)=>setName(e.target.value)}/><br /><br />
      <input placeholder="Number" onChange={(e)=>setNumber(e.target.value)}/><br /><br />
      <button onClick={()=>addTeacher(email,phone,name) }> Submit</button>
    </div>
    <h2>Input Class </h2>
    <div>
      <input placeholder="Name" onChange={(e)=>setClassname(e.target.value)}/><br /><br />
      <input placeholder="Teacher Id" onChange={(e)=>setTeacherId(e.target.value)}/><br /><br />
      <button onClick={()=>addClass(classname,teacherId) }> Submit</button>
    </div>
    <h2>Enroll Student </h2>
    <div>
      <input placeholder="ClassId" onChange={(e)=>setClassId(e.target.value)}/><br /><br />
      <input placeholder="Student Id" onChange={(e)=>setStudentId(e.target.value)}/><br /><br />
      <button onClick={()=>enrollStudent(classId,studentId) }> Submit</button>
    </div>
    {/* <div>
    {users.map((user)=>(
      <div>
        <h1>{user.name}</h1>
        <button onClick={()=>deleteUser(user.id)}>Delete User</button><br />
        <input placeholder="New Name" onChange={(e)=>setName(e.target.value)}/>
        <button onClick={()=>updateUser(user.id)}>Update</button>
      </div>
    ))}
    </div>   */}

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
