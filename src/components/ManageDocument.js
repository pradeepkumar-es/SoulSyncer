import React, { useState,useEffect } from 'react'
import { storage,database } from '../firebase'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import {ref, 
         uploadBytesResumable,
         getDownloadURL} from 'firebase/storage'
import { collection,
          addDoc,
         getDocs, //for getting data but we need to refresh every time data changes 
         doc,  //for update doc
         updateDoc, //for update doc
         deleteDoc,
         onSnapshot, //for get Data //for real time update
         query, //for filtering data
         where  //for filtering data
      } from 'firebase/firestore';
import { v4 } from 'uuid';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function ManageDocument() {
  // const [userFile, setUserFile] = useState({});
  const [array, setArray] = useState([])
  const [uploadProgress, setUploadprogress] = useState('')
  const [imgUrl, setImgUrl] =useState('')
  const [docName, setDocName]=useState('')
  const [user,setUser] = useState(null)
  
console.log(user)
  // const handleInput=(event)=>{
  //   let newItem = {[event.target.name]:event.target.value}
  //   setUserFile({...userFile, ...newItem });
  // }
const auth= getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
    if(user){
        // alert("You are Logged In")
        setUser(user)
    }else {
        // alert("You are Logged Out")
        setUser(null)
    }
    })
   },[])
  
  const addDocument=async()=>{
    const collectionRef= collection(database, 'users')
    await addDoc(collectionRef, {
      documentName: docName,
      imageUrl: imgUrl
  })
  .then(() => {
    // Success message or further action
    alert("Document Added Successfully")
    getDetails()
  })
  .catch((error) => {
    // Handle error
    alert(error.message)
  });
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
  
  const getDetails = async(user)=>{
    const collectionRef= collection(database, 'users')
    // const data = await getDocs(collectionRef);  //async and await is used to run the next code if and only after getting data 
    //         setArray(data.docs.map((item)=>{
    //             return {...item.data(), id: item.id}
    //         }))

                //for real time
                 onSnapshot(collectionRef, (response)=>{  //for selected response
                        setArray(
                                    response.docs.map((item)=>{
                                        return {...item.data(), id: item.id};
                                    }))
                    })
            //for selected only in real time
            // const uidQuery =query(collectionRef, where("uid", "==", user.uid) )
            //      onSnapshot(uidQuery, (response)=>{  //for selected response
            //             setArray(
            //                         response.docs.map((item)=>{
            //                             return {...item.data(), id: item.id};
            //                         }))
            //         })
}
useEffect(()=>{
  getDetails()
},[])

        const updateData=(id)=>{
          const docToUpdate = doc(database, 'users', id ) //in the last parameter it is teacher id
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
    <div>
      <p>My Documents</p>
      <Link to='/myprofile'>My Profile</Link>
      <Logout />
      
      <p>{uploadProgress}</p>
      <input type="text" name='documentName' placeholder='Document Name' onChange={(event)=>setDocName(event.target.value)} />
      {/* <button onClick={addDocName}>Add Document Name</button> */}
      <input type="file" name='document' onChange={(event)=>handleUpload(event)}  />
      <button onClick={addDocument}>Add Document</button>
      {/* <button onClick={getDetails}>show document</button>  */}  {/*use if u are using get doc */}
      {/* <a href="{imgUrl}">See Your Document</a> */}
      {user? (
        array.map((content)=>{
          return(
          <div>
            <h4>{content.documentName}</h4>
            <img src={content.imageUrl} /><br />
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
  )
}

export default ManageDocument
