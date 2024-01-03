import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout';

//MyProfile functional component for this page
function MyProfile(props) { //receives props
    const navigate =useNavigate();
    const manageDoc=()=>{
        navigate('/managedocument')  //navigation to manage doc component
    }

  return (
    <div>
      My Profile
      <p id='userId'>User Id: {props.uid}</p>
      <p id='userEmail'>Email: {props.user}</p>
      <p className='myprofile-managedoc' onClick={manageDoc}>Manage My Document</p> 
      <Logout/>
    </div>
  )
}

export default MyProfile
