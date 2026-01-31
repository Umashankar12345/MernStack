function Calculate(){
let num = document.getElementById("number").value;

if(num === ""){
    document.getElementById("result").innerText = "please enter a number";
    return;
}

let valnum = Number(num);
    let square = valnum * valnum;
    document.getElementById('number2').value = square;
    
     let cube = valnum * valnum * valnum;
     document.getElementById('number3').value = cube;
}

