import React, { useState, useEffect } from "react";
import { storage, database } from "../firebase";
import { MdCloudUpload } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc, //for update doc
  updateDoc, //for update doc
  deleteDoc,
  onSnapshot, //for get Data //for real time update
  query,
  where,
} from "firebase/firestore";
import { v4 } from "uuid"; //gor generating unique id for different uploads to rename it
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyProfile from "./MyProfile";

function ManageDocument() {
  //functional component to manage document
  const [array, setArray] = useState([]);
  const [uploadProgress, setUploadprogress] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [docName, setDocName] = useState("");
  const [user, setUser] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);
  const auth = getAuth(); //firebase
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getDetails(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  const addDocument = async (userdata) => {
    const collectionRef = collection(database, "users");
    await addDoc(collectionRef, {
      documentName: docName,
      imageUrl: imgUrl,
      userId: userdata.uid,
    })
      .then(() => {
        alert("Document Added Successfully");
        getDetails();
      })
      .catch((error) => {
        // Handle error
        alert(error.message);
      });
  };
  const handleAdd = () => {
    addDocument(user);
  };
  const handleUpload = (event) => {
    const storageRef = ref(storage, `images/${v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadprogress("Upload is " + progress + "% done");
      },
      (err) => {
        alert(err.message);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  //getting data to display on browser

  const getDetails = async (userdata) => {
    if (!userdata || !userdata.uid) {
      console.error("userdata is null or uid is missing");
      return;
    }
    const collectionRef = collection(database, "users");
    const ageQuery = query(
      collectionRef,
      where("userId", "==", `${userdata.uid}`)
    );

    //for real time update
    onSnapshot(ageQuery, (response) => {
      //for selected response
      setArray(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };
  useEffect(() => {
    if(user){
      getDetails(user);
    }
  }, [user]);

  const updateData = (id) => {
    const docToUpdate = doc(database, "users", id); //in the last parameter it is  id
    updateDoc(docToUpdate, {
      documentName: docName,
      // imageUrl: imgUrl
    })
      .then(() => {
        alert("Data Updated successfully");
        getDetails();
      })
      .then((error) => {
        if(error){
          alert(error.message);
        }else{
          return;
        }
      });
  };
  const deleteData = (id) => {
    const docToDelete = doc(database, "users", id);
    deleteDoc(docToDelete)
      .then(() => {
        alert("Data deleted successfully");
        getDetails();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleEdit=(content)=>{
    setSelectedImage(selectedImage===content.id?null:content.id)
  }
  const handleUpdate = (content)=>{
    updateData(content.id)
    setSelectedImage(null)
  }
  return (
    <div className="documentDashboard">
      <div className="sidebar">
        <div className="nav-tab">Hello</div>
        <Logout />
      </div>
      <div className="mainPanel">
        <div className="headerNav"><h1 className="mainPanelHeading">Cloud Vault</h1> <div><Logout/></div></div>
        <div className="welcome"><h1>Welcome Back!</h1></div>
        <h3 className="uploadPanelHeading">Upload Your File</h3>
        <form
          className="inputForm"
          action=""
          onClick={() => {
            document.getElementById("uploadInput").click();
          }}
        >
          {" "}
          {/* click() method simulates a mouse click on an element.*/}
          <input
            id="uploadInput"
            type="file"
            name="document"
            onChange={(event) => handleUpload(event)}
          />
          <div>
            <MdCloudUpload className="uploadIcons" />
          </div>
          <div>
            <p className="progressText">{uploadProgress}</p>
          </div>
        </form>
        <div className="AddDocAction">
          <input
            className="docInput"
            type="text"
            name="documentName"
            placeholder="Document Name"
            onChange={(event) => setDocName(event.target.value)}
          />
          <button onClick={handleAdd}>Add Document</button>
        </div>
        {/* <button onClick={addDocument}>Add Document</button> */}
        {/* <p>{user.uid}</p>
      <p>{user.email}</p>  */}
        {/* displaying data if user is present */}
        <h3 className="filePanel-heading">My Uploaded Files</h3>
        <div className="Alldocument">
          {array.length > 0 ? (
            array.map((content, index) => {
              return (
                <div className="document" key={index}>
                  <div>
                    <img
                      className="docImage"
                      src={content.imageUrl}
                      alt="document"
                    />
                    <MdDelete className="deleteDoc" title="Delete" onClick={()=>deleteData(content.id)}  size={15}/>
                    <br />
                  </div>
                  {
                    selectedImage===content.id
                    ?
                    <div className="updateDoc">
                  <input
                    type="text"
                    name="documentName"
                    // value={content.documentName}
                    placeholder="Document Name"
                    onChange={(event) => setDocName(event.target.value)}
                  />
                  <button onClick={() => handleUpdate(content)}>
                    Update
                  </button>
                  </div>
                  :
                  <div className="uploadedDoc">
                  <h4 className="uploadedDocName">
                    <span>{content.documentName}</span>
                    <span><MdOutlineEdit className="edit" size={16} onClick={()=>handleEdit(content)}/></span>
                  </h4>
                </div>
                  }
                  {/* <hr /> */}
                </div>
              );
            })
          ) : (
            <p className="noDataMessage">
              No Document Found! Add Your Document securely to get accessible
              everywhere online
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageDocument;
