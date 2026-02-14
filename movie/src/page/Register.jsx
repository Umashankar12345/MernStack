// import React, { useState } from "react";
// import { useAuth } from '../../hooks/useAuth';
// function Register({ onRegister }) {
//   const [name, setName] = useState("");
//   const [roll, setRoll] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();

//     const userData = {
//       name,
//       roll,
//       email,
//       password,
//     };

//     // store in localStorage
//     localStorage.setItem("user", JSON.stringify(userData));

//     alert("Registration Successful!");
//     onRegister(); // go to login page
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Register</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="text"
//         placeholder="Roll Number"
//         value={roll}
//         onChange={(e) => setRoll(e.target.value)}
//         required
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default Register;
