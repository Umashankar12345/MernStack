// let  array = [2,3,5,7,8];
//  let   result = array.map(x => x * 3);
//   console.log(result);

//   function Add(){
//     let weight = document.getElementById('weight').value;
//     let heightcm = document.getElementById('height').value;

//     if(weight === " " || heightcm === "" ){
//         alert("please fill all required fields");
//         return;
//     }
//      let height = heightcm / 100

//     let  bmi =  weight/(height * height);
//  document.getElementById("res").innerText=bmi.toFixed(2);
//     // document.getElementById("weight").value="";
//     // document.getElementById("height").value="";
  
//   }
//   let array = ["rohit" , "vikash" , "ravi"];
//   let  result =  array.map(name => name.toUpperCase());
//   console.log(result);

// let bjpCount = 0;
// let congressCount = 0;
//  let notaCount = 0;

//  function hideAll(){
//     document.getElementById("Bjpresult").innerText = " ";
//     document.getElementById("congressresult").innerText = " ";
//     document.getElementById("notaresult").innerText = " ";
//  }

//  function VoteBjp(){
//     bjpCount++;
// hideAll();
// document.getElementById("Bjpresult").innerText = "Bjp votes:" + bjpCount;
//  }
//   function VoteCongress(){
//     congressCount++;
// hideAll();
// document.getElementById("congressresult").innerText = "Congress votes:" + congressCount;
//  }
//   function VoteNota (){
//     notaCount++;
// hideAll();
// document.getElementById("notaresult").innerText = "Nota votes:" + notaCount;
//  

function kFun(){
  let task = document.getElementById("task").value;

  if(task === ""){
    alert("please all fields required");
    return;
  }
  let  li = document.createElement("li");
  let tasktext =  document.createTextNode(task);
  li.appendChild(tasktext);
    

  let deletebtn = document.createElement("button");

  deletebtn.innerText = "Delete";
  deletebtn.className= "delete-btn";

  deletebtn.onclick = function(){
    li.remove();
  }
  li.appendChild(document.createTextNode(""));
  li.appendChild(deletebtn);

  document.getElementById("todolist").appendChild(li);

  document.getElementById("task").value = "";

}

// git add .
// git commit -m "daily practice"
// git push
