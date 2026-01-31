// // const fun = ()=> {
// //     return "Hello"
// // }
// //  console.log(fun());
// //  const nameFun = (user = 'gest') => {
// //     return user;
// //  }
// //  console.log(nameFun())
// //  console.log(nameFun("umash"))

// //  const  functionsum = (a , b) => {
// //     return a + b;
// //  }
// //  console.log(functionsum(10,15));

// //  const sumof = (a = 20,b = 10) => a + b;

// //  console.log(sumof());
// //  console.log(sumof(2));
// //  console.log(sumof(4));

//  // callback function implementnu
// //   const multiply = (a , b) =>  a * b;
// //  const funcall = (a, b, mul) => {
// //     return mul(a , b);
// //  }
// //  console.log(funcall(10, 5 , multiply));


// //  const add = (a , b) => a + b;

// //  const funcalll = (a , b , mul) => {
// //     return mul(a , b);
// //  }
// //  console.log(funcalll(10 , 5 , add));


// //  function showmsg(msg , callback) {
// //     setTimeout(()=> {
// //         console.log("hell", msg)
// //         callback();
// //     },1000);
// //  }
// //  showmsg("Rohit" , () => {
// //     console.log("Hi")
// //  })
// //  console.log("end");

// function addData(){
//    let name = document.getElementById('name').value;
//    let age = document.getElementById('age').value;
//    let course = document.getElementById('course').value;
   
//     if (name === "" || age === "" || course === "") {
//       alert("Please fill all fields");
//       return;
//     }

//     let table = document.getElementById("tableBody");
//     let row = table.insertRow();

//     row.insertCell(0).innerText = name;
//     row.insertCell(1).innerText = age;
//     row.insertCell(2).innerText = course;

//     // Clear inputs
//     document.getElementById("name").value = "";
//     document.getElementById("age").value = "";
//     document.getElementById("course").value = "";
//   }
