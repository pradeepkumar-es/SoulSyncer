import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Registration from './components/Registration';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import ManageDocument from './components/ManageDocument';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      {/* To link different pages to each other */}
        <Router>  
        <h2>Government Doc Vault</h2>
          <Routes>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/registration' element={<Registration/>} exact/>
            <Route path='/login' element={<Login/>} exact/>
            <Route path='/logout' element={<Logout/>} exact/>
            <Route path='/myprofile' element={<MyProfile/>} exact/>
            <Route path='/managedocument' element={<ManageDocument/>} exact/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
