// import React from "react";
// import { useState } from "react";

// const[name ,setName] = useState("");
// const[email , setEmail] = useState("");
// const[password , setPassword] = useState("");
// const[roll , setRoll] = useState("");
// const[submit , setSubmit] = useState(null);

// const handleSubmit = (e) => {
//     e.preventDefault();


// const userData ={
//     name: "",
//     email: "",
//     password: "",
//     roll : ""
// };
// console.log("User Data", userData);
// setSubmit(userData);
// setRoll(""),
// setName (""),
// setPassword( ""),
// setEmail("")

// };

// return(
//     <div style= {{width: "30 px", margin: "5px auto", Height: "spx auto"}}>

//         <h2>User Registration</h2>
        
//         <form onSubmit={handleSubmit}>

//         </form>

//     </div>
// )

import React, { useState } from "react";


function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      onLogin(storedUser);
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
