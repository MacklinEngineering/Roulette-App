// let balance = 50000
let winLose
var trash = document.getElementsByClassName("fa-trash");
//const betValue = document.querySelector(`#userBetAmount`).value
//let playerWallet = 50000 //document.querySelector(`#wallet`).value;
//let playerChoiceValue = document.querySelector(`#userNum`)
let bet = document.querySelector("#playerBet")
let playerWallet = document.querySelector("#wallet")

let playerChoice = document.getElementById("userNum")

//let playerWallet = document.querySelector(`#wallet`).value;
//console.log(bet, "this is bet")

function getRandomChoice(numOfChoices){
  let choiceProb = Math.ceil(Math.random()*100) % numOfChoices
  console.log(choiceProb) //Mentor Question: console logging as NaN
   return choiceProb
}



function bankRoll(bet, playerWallet, winLose){
  playerWallet = Number(playerWallet)
  bet = Number(bet)
  // console.log( playerWallet, "string")
  //console.log( bet, "new target")
  if(winLose ){
    playerWallet = playerWallet + (bet * 9)
    console.log("we WON")
    document.querySelector("#wallet").innerHTML = `${playerWallet}`
    fetch(`/bank`, {
      method: `put`,
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        betAmt: bet,
        betMult: 9,
        houseWins: false

      })
    }).then(function(response){
      // window.location.reload()

    });
    console.log(document.querySelector("#wallet").innerHTML = `${playerWallet}`)
  }else{
    console.log(playerWallet, "bingo")
    playerWallet = playerWallet - (bet)
    console.log("you LOST")
    document.querySelector("#wallet").innerHTML = `${playerWallet}`
    fetch(`/bank`, {
      method: `put`,
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        betAmt: bet,
        houseWins: true

      })
    }).then(function(response){

      // window.location.reload()

    }).catch(function(error){
        console.log(error)
    })


  }
  // if(winLose !== playerChoiceValue){

  // }
  // else if(randomColor === winColor){
  //   playerWallet = playerWallet + (bet * 2)
  //   document.querySelector("#wallet").innerHTML = playerWallet.toString()
  // }else{
  //   playerWallet = playerWallet - (bet *2)
  //   document.querySelector("#wallet").innerHTML = playerWallet.toString()
  // }

}


// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//             // req.body: betMult:  10  , betAmt: 200 , housewins: true/false
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });



document.getElementById("betColors").addEventListener("click", () =>{
 //document.querySelector("#wallet").textContent
 let bet = document.querySelector("#playerBet").value

 let playerChoiceValue =  parseInt(document.querySelector(`#userNum`).value)
 //console.log(playerChoiceValue, "just in case")
 //bet = bet.value
 let playerWallet = document.querySelector("#wallet").innerHTML
//  playerWallet = playerWallet.innerHTML
  //console.log(playerWallet, "test")
  //console.log(bet, "is the bet")
  // const colorValue = document.querySelector('#userColor').value
  //console.log(playerWallet, "oooooooo")
  //let winColor = playerChoiceValue

  let randomColor = getRandomChoice(38)
    //bankRoll(bet, playerWallet, playerChoiceValue, randomColor)
  if(playerChoiceValue === 36 && randomColor % 2 === 0){
    let win = true
    bankRoll(bet, playerWallet, win)
    console.log("winnerA")
  }else if(playerChoiceValue === 37 && randomColor % 2 !== 0){
    let win = true
    bankRoll(bet, playerWallet, win)
    console.log("winnerB")
  }
  else if(randomColor === playerChoiceValue){
    let win = true
    bankRoll(bet, playerWallet, win)
    // bet = Number(bet)

    // document.querySelector("#wallet").value += (bet *2)
    //console.log(document.querySelector("#wallet").innerHTML =
   //ballLandsOn = "Black"
    console.log("winnerC")

  }
  else{
    let win = false
    bankRoll(bet, playerWallet, win)
    //document.querySelector("#wallet").value -= (bet *2)
    console.log("LOSER")

  }
  // fetch(`bank`, {
  //   method: `put`,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },

  //   body: JSON.stringify({
  //     // betAmt: betValue,
  //     betMult: 1,
  //     houseWins: winLose == parseInt(colorValue)

  //   })
  // }).then(function(response){
  //   // window.location.reload()

  // });


})


document.getElementById("spinRoulette").addEventListener("click", () =>{
  // const colorValue = document.querySelector('#userColor').value
  let bet = document.querySelector("#playerBet").value
 let playerWallet = document.querySelector("#wallet").innerHTML
  //const betValue = document.querySelector(`#userBetAmount`).value
  // console.log(playerChoice.value)
  playerChoiceValue =  parseInt(playerChoice.value)
  // console.log(playerChoiceValue, "a value for choice")
   winLose = getRandomChoice(37)
  //console.log(winLose, "something here")
  if(winLose === playerChoiceValue){
    console.log("winner")
    bankRoll(bet, playerWallet)
    // console.log(winLose)
    console.log(bankRoll(bet, playerWallet),"rol")
    // console.log(playerChoice)

  }else if(winLose !== playerChoiceValue){
    console.log("You Lose!")
    bankRoll(bet, playerWallet)
  }else if(winLose % 2 === 0){
  // console.log(winLose)
  // fetch(`bank`, {
  //   method: `put`,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },

  //   body: JSON.stringify({
  //     betAmt: betValue,
  //     betMult: 2,
  //     // houseWins: winLose == parseInt(numberValue)
  //     numberValue: numberValue

  //   })
  // }).then(function(response){
  //   window.location.reload()
  // })
  }
})


/*
server side
  Bets
    1 chosen: red
    2 wager:10
    3 won: true
  Actual
  1 chosen:black
  2 wager:10
  3 won: false
Bank
  1 total:200M
  2 wins:
  3 lost:
POST
fetch or form condition
PUT (update)
client side: fetch request is only thing that triggers PUT request
POST
only way to put something in a database
GET
Page reload or type in URL
* Owner
one doc to keep track of Bank
don't need form for doc info on server side
Database
  collection
    Bank
      1 document with
        total
        wins
        loss
Owners log-in only see's form for DB
CLIENT side
did a fetch, fetch makes PUT request
PUT updates the DB
API updates PUT
Page reload
Get document into DB
client side JS
API handle put to update stuff in document

*/
