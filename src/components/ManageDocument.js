import React, { useState,useEffect } from 'react'
import { storage,database } from '../firebase'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import {ref, 
         uploadBytesResumable,
         getDownloadURL} from 'firebase/storage'
import { collection,
          addDoc, 
         doc,  //for update doc
         updateDoc, //for update doc
         deleteDoc,
         onSnapshot, //for get Data //for real time update
         query, where
      } from 'firebase/firestore';
import { v4 } from 'uuid';   //gor generating unique id for different uploads to rename it
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import MyProfile from './MyProfile'

function ManageDocument() { //functional component to manage document
  const [array, setArray] = useState([])
  const [uploadProgress, setUploadprogress] = useState('')
  const [imgUrl, setImgUrl] =useState('')
  const [docName, setDocName]=useState('')
  const [user,setUser] = useState(null)

const auth= getAuth(); //firebase
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
    if(user){
        setUser(user)
        getDetails(user)
    }else {
        setUser(null)
    }
    })
   },[auth])
  
  const addDocument=async(userdata)=>{
    const collectionRef= collection(database, 'users')
    await addDoc(collectionRef, {
      documentName: docName,
      imageUrl: imgUrl,
      userId : userdata.uid
  })
  .then(() => {
    alert("Document Added Successfully")
    getDetails()
  })
  .catch((error) => {
    // Handle error
    alert(error.message)
  });
  }
  const handleAdd=()=>{
    addDocument(user);
  }
  const handleUpload=(event)=>{
        const storageRef = ref(storage, `images/${v4()}`)
        const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
            // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadprogress('Upload is ' + progress + '% done');
            }, 
        (err) => {
        alert(err.message)
        }, 
        () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
        });
        }
        );
  }

  //getting data to display on browser 
  
  const getDetails = async(userdata)=>{
    const collectionRef= collection(database, 'users')
    const ageQuery =  query(collectionRef, where("userId", "==" , `${userdata.uid}`))

                //for real time update
             onSnapshot(ageQuery, (response)=>{  //for selected response
                        setArray(
                                    response.docs.map((item)=>{
                                        return {...item.data(), id: item.id};
                                    }))
                    })
}
useEffect(()=>{
  getDetails(user)
},[user])

        const updateData=(id)=>{
          const docToUpdate = doc(database, 'users', id ) //in the last parameter it is  id
          updateDoc(docToUpdate,{
            documentName: docName,
            // imageUrl: imgUrl
          })
          .then(()=>{
              alert("Data Updated successfully")
              getDetails()
          })
          .then((error)=>{
              alert(error.message);
          })
        }
        const deleteData=(id)=>{
          const docToDelete = doc(database, 'users', id)
          deleteDoc(docToDelete)
          .then(()=>{
              alert("Data deleted successfully")
              getDetails()
          })
          .catch((err)=>{
              alert(err.message)
          })
        }
  return (
    <div className='documentDashboard'>
      <div className='sidebar'>
        <div className='nav-tab'>
          Hello
        </div>
        <Logout />
      </div>
      <div className='main-panel'>
      <p>My Documents</p>
      <p>{uploadProgress}</p>
      <input type="text" name='documentName' placeholder='Document Name' onChange={(event)=>setDocName(event.target.value)} />
      <input type="file" name='document' onChange={(event)=>handleUpload(event)}  />
      <button onClick={handleAdd}>Add Document</button>
      {/* <button onClick={addDocument}>Add Document</button> */}
       {/* <p>{user.uid}</p>
      <p>{user.email}</p>  */}
      {/* displaying data if user is present */}
      {(array.length>0)? (
        array.map((content)=>{
          return(
          <div  >
            <h4>{content.documentName}</h4>
            <img src={content.imageUrl}  alt='document' className='image-uploaded'/><br />
            <input type="text" name='documentName' placeholder='Document Name' onChange={(event)=>setDocName(event.target.value)} />
            <button onClick={()=>updateData(content.id)}>update Document Name</button>
            <button onClick={()=>deleteData(content.id)}>Delete Document</button>
            <hr />
          </div>
          )
        })) 
        : (
          <p>No Document Found! Add Your Document securely to get accessible everywhere online</p>
        )
      }
      </div>
    </div>
  )
}

export default ManageDocument
