import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout';
// import { app } from '../firebase';
// import React, { useState } from "react";
// // import firebase from "firebase/app";


// import { getAuth, onAuthStateChanged } from 'firebase/auth'

function MyProfile(props) {
    // const uid = app.auth().currentUser.uid;
    // const email = app.auth().currentUser.email;
    // const auth =getAuth();
    const navigate =useNavigate();
    const manageDoc=()=>{
        navigate('/managedocument')
    }

  return (
    <div>
      My Profile
      <p id='userId'>User Id: {props.uid}</p>
      <p id='userEmail'>Email: {props.user}</p>
      {/* <p id='userEmailVerification'>Email Verification Status: {props.emailStatus}</p> */}
      <p onClick={manageDoc}>Manage My Document</p> 
      <Logout/>
    </div>
  )
// const [email, setEmail] = useState("");
//   const [uid, setUid] = useState("");
// const auth= getAuth();
//   onAuthStateChanged((user) => {
//     if (user) {
//       setEmail(user.email);
//       setUid(user.uid);
//     } else {
//       setEmail("");
//       setUid("");
//     }
//   });

//   return (
//     <div>
//       <h1>Email: {email}</h1>
//       <h1>UID: {uid}</h1>
//     </div>
//   );
}

export default MyProfile
