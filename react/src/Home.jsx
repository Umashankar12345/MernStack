import React from 'react'

 export default function Home({name , password , section , email}) {
  return (
    <div>
      <form action="post"></form>
      <h2>Name:{name}</h2>
      <h2>Password {password}</h2>

      <h2>section : {section}</h2>
      <h2>Email : {email}</h2>
    </div>
  )
}

    

