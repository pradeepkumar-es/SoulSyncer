import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const handleInput=(event)=>{
        let newItem= {[event.target.name]: event.target.value}
        setData({...data, ...newItem})
    }

    
    const handleLogin=()=>{
         signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=>{
            alert(response.user)
            navigate('/myprofile')
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    return (
        <div>
            <h3>Login</h3>
            <input type="email" name="email" placeholder="email"  onChange={(event)=>handleInput(event)} />
            <input type="password" name="password" placeholder="password"  onChange={(event)=>handleInput(event)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have account?</p>
            <span><Link to='/registration'>Register</Link></span>
        </div>
    )
}