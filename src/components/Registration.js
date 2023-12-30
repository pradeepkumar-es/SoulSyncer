import React, { useState } from "react";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import app from '../firebase'
import { Link } from "react-router-dom";
export default function Registration () {
    const [data, setData] = useState({})
    const handleInput=(event)=>{
        let newInput = {[event.target.name]: event.target.value}
        setData({...data, ...newInput})
    }
    const handleRegistration=()=>{
        const auth =getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=>{
            alert(response.user)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    return(
        <div>
            <h3>User's Registration</h3>
            <input type="email" placeholder="email" name="email" onChange={(event)=>handleInput(event)} />
            <input type="password" placeholder="password" name="password" onChange={(event)=>handleInput(event)} />
            <button onClick={handleRegistration}>Register</button>
            <p>Already have Account?</p> <Link to='/login'>Login</Link>
        </div>
        
    )
}