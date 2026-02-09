// import { useState } from "react";
// import Home from "./Home";
// import "./App.css";

//  export default function App() {

//   const[name ,setName] = useState("");
//   const[password , setPassword] = useState("");
//   const[section , setSection] = useState("");
//   const[email , setEmail] = useState("");

//   function handleSubmit(e){
//     console.log(name);
//     console.log(password);
//     console.log(section);
//     console.log(email);
//     e.preventDefault();
//   } 
//  return(

// <form onSubmit={handleSubmit}>
//   <label>Name:
//   <input type="text " placeholder="Enter your name"  value={name} onChange={(e)=>setName(e.target.value)} /> <br /><br />
//   </label>
//   <label >Password:
//   <input type="text" placeholder="Enter your password"  value = {password} onChange={(e) => setPassword(e.target.value)}/> <br /> <br />
//   </label>
//   <label>Section:
//   <input type="text" placeholder="Enter your section" value={section}  onChange={(e) => setSection(e.target.value)}/> <br /><br />
//   </label>
//   <label>Email:
//   <input type="text" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} /> <br /> <br />
//   </label>

//   <button type="submit">submit</button>
// </form>
//   )
// }



// import Header from "./component/Header";

// import Footer from "./component/Footer";
// import Sidebar from "./component/sidebar";
// import FormPage from "./component/Form";
// function App() {
//   return (
//     <div className="app">
//       <Header />

//       <div className="layout">
//         <Sidebar />
//         <div className="content">
//           <h2>Dashboard Content</h2>
//           <p>Welcome to the dashboard</p>
//         </div>
//       </div>

//       <Footer />
//     <FormPage/>
    
//     </div>
//   );
// }

// export default App;


// import { useState } from "react";
// import Header from "./component/Header";
// import Footer from "./component/Footer";
// import Sidebar from "./component/sidebar";
// import FormPage from "./component/Form";
// import "./App.css"; // Make sure to create this CSS file

// function App() {
//   const [page, setPage] = useState("dashboard"); // Added state for page management

//   const renderPage = () => {
//     switch (page) {
//       case "form":
//         return <FormPage />;
//       case "about":
//         return (
//           <div className="content">
//             <h2>About Page</h2>
//             <p>This is the about page content.</p>
//           </div>
//         );
//       case "dashboard":
//       default:
//         return (
//           <div className="content">
//             <h2>Dashboard Content</h2>
//             <p>Welcome to the dashboard</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="app">
//       <Header />

//       <div className="layout">
//         <Sidebar setPage={setPage} /> {/* Pass setPage as prop */}
//         <div className="main-content">
//           {renderPage()}
//         </div>
//       </div>

//       <Footer />
//       <Sidebar/>
//     </div>
//   );
// }

// export default App;


// import React from 'react'
// import FlipCoin from './component/FlipCoin'
// function App() {
//   return (
//     <div>
//       <FlipCoin />
//     </div>
//   )
// }

// export default App
import React, { useState } from "react";
import { BackgroundGradientDemo } from "./ui/background-gradient";
// import Register from "./Register";
// import Login from "./Login";
// import Success from "./Success";
import Login from "./Page/Login";
import Register from "./Page/Register";
import sucess from "./Page/Sucess";

function App() {
  const [page, setPage] = useState("register");
  const [user, setUser] = useState(null);

  return (
    <div>
      <BackgroundGradientDemo />
      {page === "register" && (
        <Register onRegister={() => setPage("login")} />
      )}

      {page === "login" && (
        <Login
          onLogin={(userData) => {
            setUser(userData);
            setPage("success");
          }}
        />
      )}

      {page === "success" && <Success user={user} />}
    </div>
  );
}

export default App;
