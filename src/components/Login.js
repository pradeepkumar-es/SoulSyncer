import React, { useState,useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link} from "react-router-dom";
import MyProfile from "./MyProfile";

export default function Login() {
    const auth = getAuth();
    const [data, setData] = useState({})
    const [user, setUser] = useState(null)

    //handling data received from user input
    const handleInput=(event)=>{
        let newItem= {[event.target.name]: event.target.value}
        setData({...data, ...newItem})
    }

    //handling login with the help of Firebase
    const handleLogin=()=>{
         signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=>{
            alert(response.user)
            setUser(response.user)
        })
        .catch((err)=>{
            alert(err.message)
            setUser(null)
        })
    }
    
  //setting user data on authentication change with the help of firebase
  useEffect(()=>{
   onAuthStateChanged(auth, (user)=>{
    if(user){
        setUser(user)
    }else {
        setUser(null)
    }
    })
    }
   ,[])
    return (
        <div>  
            {/* displaying user's profile, if on authetication change we are getting user, otherwise displaying login inteface.*/}
            {user ? (
            <>
            <MyProfile 
            uid={user.uid}   //passing props to my profile function component
            user={user.email}
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
            <p id="userEmailVerification">veri</p>
            </div>)
        }
        </div>
    )
}