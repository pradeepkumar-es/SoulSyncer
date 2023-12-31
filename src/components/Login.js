import React, { useState,useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import MyProfile from "./MyProfile";
export default function Login() {
    const auth = getAuth();
    // const navigate = useNavigate();
    const [data, setData] = useState({})
    const [user, setUser] = useState(null)
    const handleInput=(event)=>{
        let newItem= {[event.target.name]: event.target.value}
        setData({...data, ...newItem})
    }
    const handleLogin=()=>{
         signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=>{
            alert(response.user)
            setUser(response.user)
            // navigate('/myprofile')
        })
        .catch((err)=>{
            alert(err.message)
            setUser(null)
        })
    }
    
  useEffect(()=>{
//    const userAuth= onAuthStateChanged(auth, (user)=>{
   onAuthStateChanged(auth, (user)=>{
    if(user){
        // alert("You are Logged In")
        setUser(user)
    }else {
        // alert("You are Logged Out")
        setUser(null)
    }
    })
   
//    return ()=>userAuth(); 
    }
   ,[])
    return (
        <div>
            {user ? (
            <>
            <MyProfile 
            uid={user.uid}
            user={user.email}
            // emailStatus={user.emailVerified}
            />
            </>) 
            : ( 
                <div>
            <h3>Login</h3>
            <input type="email" name="email" placeholder="email"  onChange={(event)=>handleInput(event)} />
            <input type="password" name="password" placeholder="password"  onChange={(event)=>handleInput(event)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have account?</p>
            <span><Link to='/registration'>Register</Link></span>
            <p id="userEmailVerification"></p>
            </div>)
        }
        </div>
    )
}