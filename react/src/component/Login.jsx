import React, { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload

    // setSubmittedData({
    //   name,
    //   email,
    //   password,
    // });
    
  const userData = {
    name,
    email,
    password,
  };

  
  console.log("User Registered:", userData);

  setSubmittedData(userData);

    // clear inputs after submit
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Registered Details</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
