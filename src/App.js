import "./App.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfile from "./components/MyProfile";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./components/Home"));
const ManageDocument = React.lazy(()=>import('./components/ManageDocument'))
function App() {
  return (
    <div className="App">
      {/* To link different pages to each other */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Cloud Vault is loading......
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
            exact
          />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/logout" element={<Logout />} exact />
          <Route path="/myprofile" element={<MyProfile />} exact />
          <Route path="/managedocument" element={
            <Suspense fallback={
              <div style={{
                height:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}>
                Document Storage is Loading....
              </div>
            }>
              <ManageDocument />
            </Suspense>
            } exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
