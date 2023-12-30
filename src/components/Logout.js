import React from "react";
import { getAuth, signOut,  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Logout () {
    const auth = getAuth();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        signOut(auth);
        navigate('/login')
    }
    

    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}