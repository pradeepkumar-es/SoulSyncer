import React from 'react'
import Login from './Login'
// import storageImage from '../images/doc-storage.jpeg'
function Home() {
  return (
    <div className='home'>
      {/* <div className='info'>
      <h2>Cloud Vault</h2>
        <img width="300" height="200" src={storageImage} alt="Storage Image Template"/>
      </div> */}
      <div>
      <Login/>
      </div>
      
    </div>
  )
}

export default Home
