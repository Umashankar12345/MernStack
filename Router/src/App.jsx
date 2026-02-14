// import { useState } from 'react'
// import {BrowserRouter , Routes , Route , Link} from "react-router-dom";
// import './App.css'
// import Home from "./Home";
// import About from "./About";
// import Profile from "./Profile";


// function App() {
//   return(
//     <BrowserRouter>
//     {/* //navigate */}
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/profile">Profile</Link>
//     </nav>
    
//     {/* //Routing */}

//     <Routes>
//       <Route path="/" element = {<Home/>}></Route>
//       <Route path="/about" element={<About/>}></Route>
//       <Route path="/profile" element={<Profile/>}></Route>

//     </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;


// import React from 'react'
// import {BrowserRouter , Routes , Route , Link} from "react-router-dom";
// import Name from "./Pages/Name";
// import Reg from "./Pages/Reg";
// import Session from "./Pages/Session";
// function App() {
//   return (
//     <BrowserRouter>
//     <nav>
//       <Link to="/reg">Registration</Link> <br/>

//       <Link to="/name">Name</Link> <br />
//       <Link to="/session">Session</Link> <br />
//     </nav>

//     <Routes>
//       <Route path="/reg"  element={<Reg/>}> </Route>
//       <Route path="/name" element={<Name/>}>  </Route>
//       <Route path="/session" element={<Session/>}></Route>

//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


// 3./

import {BrowserRouter , Routes , Route} from "react-router-dom";

import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";
// import  ProtectedRoute from "./routes/ProtectedRoute";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={
          <ProtectedRoute>
             <Admin /> 
             </ProtectedRoute>
            }>
              </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;