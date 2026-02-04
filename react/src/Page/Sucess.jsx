import React from "react";

function Success({ user }) {
  return (
    <div>
      <h2>Login Successful</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Roll Number:</b> {user.roll}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}

export default Success;
