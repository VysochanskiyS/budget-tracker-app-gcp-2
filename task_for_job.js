// var PORT = process.env.PORT || 5000;
// var express = require('express');
// var app = express();

// var http = require('http');
// var server = http.Server(app);

// app.use(express.static('client'));

// server.listen(PORT, function() {
//   console.log('Chat server running');
// });

// var io = require('socket.io')(server);

// io.on('connection', function(socket) {
//   socket.on('message', function(msg) {
//     io.emit('message', msg);
//   });
// });

// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

// SELECT ELEMENTS
// const balanceEl = document.querySelector(".balance .value");
// const incomeTotalEl = document.querySelector(".income-total");
// const outcomeTotalEl = document.querySelector(".outcome-total");
// const incomeEl = document.querySelector("#income");
// const expenseEl = document.querySelector("#expense");
// const allEl = document.querySelector("#all");
// const incomeList = document.querySelector("#income .list");
// const expenseList = document.querySelector("#expense .list");
// const allList = document.querySelector("#all .list");

// // SELECT BTNS
// const expenseBtn = document.querySelector(".tab1");
// const incomeBtn = document.querySelector(".tab2");
// const allBtn = document.querySelector(".tab3");

// // INPUT BTS
// const addExpense = document.querySelector(".add-expense");
// const expenseTitle = document.getElementById("expense-title-input");
// const expenseAmount = document.getElementById("expense-amount-input");

// const addIncome = document.querySelector(".add-income");
// const incomeTitle = document.getElementById("income-title-input");
// const incomeAmount = document.getElementById("income-amount-input");







// // SELECT CHART ELEMENT
// const chart = document.querySelector(".chart");

// // CREATE CANVAS ELEMMENT
// const canvas = document.createElement("canvas");
// canvas.width = 50;
// canvas.height = 50;

// // APPEND CANVAS TO CHART ELEMENT
// chart.appendChild(canvas);

// // TO DRAW ON CANVAS, WE NEED TO GET CONTEXT OF CANVAS
// const ctx = canvas.getContext("2d");

// // CHANGE THE LINE WIDTH
// ctx.lineWidth = 8;

// // CIRCLE RADIUS
// const R = 20;

// function drawCircle(color, ratio, anticlockwise){

//     ctx.strokeStyle = color;
//     ctx.beginPath();
//     ctx.arc( canvas.width/2, canvas.height/2, R, 0, ratio * 2 * Math.PI, anticlockwise);
//     ctx.stroke();
// }

// function updateChart( income, outcome){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     let ratio = income / (income+outcome);

//     drawCircle("#FFFFFF", - ratio, true);
//     drawCircle("#F0624D", 1 - ratio, false);
// }






// // VARIABLES
// let ENTRY_LIST;
// let balance = 0, income = 0, outcome = 0;
// const DELETE = "delete", EDIT = "edit";

// // LOOK IF THERE IS SAVED DATA IN LOCALSTORAGE
// ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
// updateUI();









// // EVENT LISTENERS
// expenseBtn.addEventListener("click", function(){
//     show(expenseEl);
//     hide( [incomeEl, allEl] );
//     active( expenseBtn );
//     inactive( [incomeBtn, allBtn] );
// })
// incomeBtn.addEventListener("click", function(){
//     show(incomeEl);
//     hide( [expenseEl, allEl] );
//     active( incomeBtn );
//     inactive( [expenseBtn, allBtn] );
// })
// allBtn.addEventListener("click", function(){
//     show(allEl);
//     hide( [incomeEl, expenseEl] );
//     active( allBtn );
//     inactive( [incomeBtn, expenseBtn] );
// })

// addExpense.addEventListener("click", function(){
//     // IF ONE OF THE INPUTS IS EMPTY => EXIT
//     if(!expenseTitle.value || !expenseAmount.value ) return;

//     // SAVE THE ENTRY TO ENTRY_LIST
//     let expense = {
//         type : "expense",
//         title : expenseTitle.value,
//         amount : parseInt(expenseAmount.value)
//     }
//     ENTRY_LIST.push(expense);

//     updateUI();
//     clearInput( [expenseTitle, expenseAmount] )
// })

// addIncome.addEventListener("click", function(){
//     // IF ONE OF THE INPUTS IS EMPTY => EXIT
//     if(!incomeTitle.value || !incomeAmount.value ) return;

//     // SAVE THE ENTRY TO ENTRY_LIST
//     let income = {
//         type : "income",
//         title : incomeTitle.value,
//         amount : parseInt(incomeAmount.value)
//     }
//     ENTRY_LIST.push(income);

//     updateUI();
//     clearInput( [incomeTitle, incomeAmount] )
// })

// incomeList.addEventListener("click", deleteOrEdit);
// expenseList.addEventListener("click", deleteOrEdit);
// allList.addEventListener("click", deleteOrEdit);

// // HELPERS

// function deleteOrEdit(event){
//     const targetBtn = event.target;

//     const entry = targetBtn.parentNode;

//     if( targetBtn.id == DELETE ){
//         deleteEntry(entry);
//     }else if(targetBtn.id == EDIT ){
//         editEntry(entry);
//     }
// }

// function deleteEntry(entry){
//     ENTRY_LIST.splice( entry.id, 1);

//     updateUI();
// }

// function editEntry(entry){
//     console.log(entry)
//     let ENTRY = ENTRY_LIST[entry.id];

//     if(ENTRY.type == "income"){
//         incomeAmount.value = ENTRY.amount;
//         incomeTitle.value = ENTRY.title;
//     }else if(ENTRY.type == "expense"){
//         expenseAmount.value = ENTRY.amount;
//         expenseTitle.value = ENTRY.title;
//     }

//     deleteEntry(entry);
// }

// function updateUI(){
//     income = calculateTotal("income", ENTRY_LIST);
//     outcome = calculateTotal("expense", ENTRY_LIST);
//     balance = Math.abs(calculateBalance(income, outcome));

//     // DETERMINE SIGN OF BALANCE
//     let sign = (income >= outcome) ? "$" : "-$";

//     // UPDATE UI
//     balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
//     outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
//     incomeTotalEl.innerHTML = `<small>$</small>${income}`;

//     clearElement( [expenseList, incomeList, allList] );

//     ENTRY_LIST.forEach( (entry, index) => {
//         if( entry.type == "expense" ){
//             showEntry(expenseList, entry.type, entry.title, entry.amount, index)
//         }else if( entry.type == "income" ){
//             showEntry(incomeList, entry.type, entry.title, entry.amount, index)
//         }
//         showEntry(allList, entry.type, entry.title, entry.amount, index)
//     });

//     updateChart(income, outcome);

//     localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
// }

// function showEntry(list, type, title, amount, id){

//     const entry = ` <li id = "${id}" class="${type}">
//                         <div class="entry">${title}: $${amount}</div>
//                         <div id="edit">E </div>
//                         <div id="delete" >D</div>
//                     </li>`;

//     const position = "afterbegin";

//     list.insertAdjacentHTML(position, entry);
// }

// function clearElement(elements){
//     elements.forEach( element => {
//         element.innerHTML = "";
//     })
// }

// function calculateTotal(type, list){
//     let sum = 0;

//     list.forEach( entry => {
//         if( entry.type == type ){
//             sum += entry.amount;
//         }
//     })

//     return sum;
// }

// function calculateBalance(income, outcome){
//     return income - outcome;
// }

// function clearInput(inputs){
//     inputs.forEach( input => {
//         input.value = "";
//     })
// }
// function show(element){
//     element.classList.remove("hide");
// }

// function hide( elements ){
//     elements.forEach( element => {
//         element.classList.add("hide");
//     })
// }

// function active(element){
//     element.classList.add("active");
// }

// function inactive( elements ){
//     elements.forEach( element => {
//         element.classList.remove("active");
//     })
// }




