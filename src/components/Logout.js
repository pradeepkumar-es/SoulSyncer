import React from "react";
import { getAuth, signOut,  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
//logout functional component
export default function Logout () {
    const auth = getAuth();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        signOut(auth);
        navigate('/login')  //redirecting to login page after logout
    }
    

    return(
        <div>
            <button className="logout" title="LogOut" onClick={handleLogout}><IoMdLogOut size={30}/></button>
        </div>
    )
}