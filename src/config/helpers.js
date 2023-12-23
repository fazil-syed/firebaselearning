import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "./firebase"



const studentCollectionRef = collection(db,"student")
const teacherCollectionRef = collection(db,"teacher")
const classCollectionRef = collection(db,"class")
const reportCollectionRef = collection(db,"report")
const attendenceCollectionRef = collection(db,"attendence")
const getUsers = async (setUsers)=>{
    try {
      const data = await getDocs(studentCollectionRef)
      const filteredData = data.docs.map(doc=>({...doc.data(),id:doc.id}))
      setUsers(filteredData)
    } catch (error) {
      console.error(error)
    }
  }                                 


  export const addStudent  = async( email,phone, name,usn,)=>{
    try {
      await addDoc(studentCollectionRef,{
        email,
        name,
        phone,
        usn,
        

      })
    } catch (error) {
      console.error(error)
    }
  }
export const addTeacher = async(name,email,phone)=>{
    try {
        await addDoc(teacherCollectionRef,{
            name,
            email,
            phone
        })
    } catch (error) {
        console.error(error)
    }
}
export const addAttendence = async (classId,date,studentId)=>{
    try {
        await addDoc(attendenceCollectionRef,{
            classId,
            date,
            studentId
        }) 
        
    } catch (error) {
        console.error(error)
    }
}

export const addClass = async (className,teacherId,timing,dayOfTheWeek)=>{
    try {
        await addDoc(classCollectionRef,
            {
                className,
                teacherId,
                timing,
                dayOfTheWeek
            })
    } catch (error) {
        console.error(error)
    }
}
export const addReport = async (classId,studentId,credit)=>{
    try {
        await addDoc(reportCollectionRef,{
            classId,    
            studentId,
            credit
        })
    } catch (error) {
        console.error(error)
    }
}

export const enrollStudent = async (classId,studentId)=>{
    try {
        const studentDoc = doc(db, "student", studentId); 
        const classes = (await getDoc(studentDoc)).data()?.enrolledClasses || [];
        await updateDoc(studentDoc, { enrolledClasses: [...classes,classId] });
        const classDoc = doc(db, "class", classId); 
        const students = (await getDoc(classDoc)).data()?.enrolledStudents || [];
        await updateDoc(classDoc, { enrolledStudents: [...students,studentId] });
    } catch (error) {
        console.error(error)
    }
}