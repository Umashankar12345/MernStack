// import React,{useState,useEffect} from "react";
// function Fetchapi(){
//     const [user,setUser]=useState([]);
//     useEffect(
//         ()=>{
//             const fetchUser=async()=>{
//                 try{
//                     const res=await fetch("https://jsonplaceholder.typicode.com/users");
//                     const data=await res.json();
//                     console.log("data", data);
//                     setUser(data);
//                 }catch(error){
//                     console.log(error);
//                 }
//             }
//             fetchUser();
//         })
//     return(
//         <div>
//             {
//                 user.map((user)=>{
//                     return(
//                     <div key={user.id} style={{border:'2px solid red'}}>
//                         <h1 >{user.name}</h1>
//                         <h1>{user.email}</h1>
//                         <h1>{user.password}</h1>
//                     </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }
// export default Fetchapi ;