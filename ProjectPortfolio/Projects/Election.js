
let bjpCount = 0;
let congressCount = 0;
 let notaCount = 0;

 function hideAll(){
    document.getElementById("Bjpresult").innerText = " ";
    document.getElementById("congressresult").innerText = " ";
    document.getElementById("notaresult").innerText = " ";
 }

 function VoteBjp(){
    bjpCount++;
hideAll();
document.getElementById("Bjpresult").innerText = "Bjp votes:" + bjpCount;
 }
  function VoteCongress(){
    congressCount++;
hideAll();
document.getElementById("congressresult").innerText = "Congress votes:" + congressCount;
 }
  function VoteNota (){
    notaCount++;
hideAll();
document.getElementById("notaresult").innerText = "Nota votes:" + notaCount;
  }