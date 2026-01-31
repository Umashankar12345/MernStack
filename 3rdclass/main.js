// const correctAns={
//         q1:'Delhi',
//         q2:'kolkata',
//         q3:'Bengaluru',
        
//     }
//     const quizForm=document.getElementById('quizForm');
//     const result=document.getElementById('result');
//     quizForm.addEventListener('submit',(e) => {
//         e.preventDefault();
//         let score = 0;
//   let total = 3;

//   const q1 = quizForm.querySelector('input[name="q1"]:checked');
//   const q2 = quizForm.querySelector('input[name="q2"]:checked');
//   const q3 = quizForm.querySelector('input[name="q3"]:checked');

//   if (!q1 || !q2 || !q3) {
//     alert("Please answer all questions");
//     return;
//   }

//   if (q1.value === correctAns.q1) score++;
//   if (q2.value === correctAns.q2) score++;
//   if (q3.value === correctAns.q3) score++;

//   result.innerText = `Your score is ${score} / ${total}`;
// });
// for(let i = 1; i <= 3; i++){
//   setTimeout(()=>
//     console.log(i), 1000)
//   }
  // for(var i = 1; i <= 3; i++){
  //   setTimeout(()=> 
  //     console.log(i) , 1000);
    
  // }
  // for(const i = 1; i <= 3; i++){
  //   setTimeout(()=> 
  //   console.log(i), 1000);
  // }

  // for(var  i = 1; i <= 3; i++){
  //   (function(x){
  //     setTimeout(()=> 
  //     console.log(x), 1000);
  //   })(i);
  // }

  // function  withdrawAccount(initialAmount){
  //   let balance = initialAmount;
    
  //   return{
    
  //   deposit: function (amount) {
  //     balance += amount;
  //     return balance;
  //   },
  //     withdraw: function (amount){
  //       balance -= amount;
  //       return balance;
  //     },
  //     getbalance : function(amount){
  //       return balance;
  //     }
  //   };
  // }

  // let account = withdrawAccount();

  // console.log(account.deposit(2500));
  //  console.log(account.withdraw(1000));
  // console.log(account.getbalance());


  // third account is minimum