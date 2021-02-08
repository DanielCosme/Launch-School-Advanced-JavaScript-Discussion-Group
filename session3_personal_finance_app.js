// /*
// Specification:
// Personal Finance App

// You will be devided into two groups. 

// Here’s link for first group (Leena, Daniel) 
// https://meet.google.com/nbe-bpec-sgg

// Here’s link for second group: (Kyle, Carl) 
// https://meet.google.com/eys-xvrx-geg
// coderpad: 
// https://coderpad.io/9WY3K69C

// Your task for today is to cooperate in order to create a plan for mini Personal Finance App. 
// A big plus is if your team will be able to make the app working. 

// Your app can work in node or browser. It’s entirely up to you. 
// You have to use at least one of the object creation patterns but you cannot use classes.
// Your team has to decide what functionalities are needed and how will your organize yourself. 
// You have time until 12:50 pm EST so plan your time wisely :)

// 12:50 pm 
// In the end of the session we will present and discuss:
// -  present how far did your team go
// - what functionalities your app has
// - if you got the app working present how it works
// - what was the most challenging  part
// - what went well
// */



//Programs that we have created: 

//First group: Leena and Daniel

// function FinanceApp(initalBalance = 0, ) {
//   this.balance = initalBalance;
//   this.expenses = [];
//   this.income = [];
// }

// FinanceApp.prototype = {
//   getBalance() {
//     return this.balance;
//   },
//   getIncome() {
//     return this.income.map(current => current.toString());
//   },
//   getExpenses() {
//     return this.expenses.map(current => current.toString());
//   },
//   addExpense(value = 0, category = 'Generic', date = 'today') {
//     this.expenses.push(new Record(value, category, date));
//     this.balance -= value;
//   },
//   addIncome(value = 0, category = 'Generic', date = 'today') {
//     this.balance += value;
//     this.income.push(new Record(value, category, date));
//   }
// }

// function Record (value, category, date) {
//   this.value = value;
//   this.category = category;
//   this.date = date;
// }

// Record.prototype.toString = function() {
//   return `value: ${this.value} - category: ${this.category} - date: ${this.date}`;
// }

// let danielFinanceApp = new FinanceApp(0);
// console.log(danielFinanceApp.addExpense(40, 'gas'));
// console.log(danielFinanceApp.addExpense(130, 'costoc'));

// console.log(danielFinanceApp.getIncome());
// console.log(danielFinanceApp.addIncome(1000));

// console.log(danielFinanceApp.getExpenses());
// console.log(danielFinanceApp.addExpense(100, 'food', 'today'))
// console.log(danielFinanceApp.addExpense(10, 'food', 'February 3'));
// console.log(danielFinanceApp.getIncome());
// console.log(danielFinanceApp.getExpenses());
// console.log(danielFinanceApp.getBalance());



// Second group: Carl and Kyle


// Budget Class
function Budget(budget) {
  this.budget = budget;
  this.expenses = [];
}

Budget.prototype.getBudget = function () {
  return this.budget;
}

Budget.prototype.addExpense = function (name, total) {
  let expense = new Expense(name, total);
  this.expenses.push(expense);
}

Budget.prototype.getExpense = function (name) {
  let filteredExpenses = this.expenses.filter(expense => expense.getName() === name);
  Object.keys(filteredExpenses).forEach(key => {
    console.log(`${filteredExpenses[key].info()}`)
  });
}

// do we want this to return the object, or render a display?
Budget.prototype.getExpenses = function () {
  console.log('Current expenses are: ');

  this.expenses.forEach(expense => {
    console.log(`${expense.info()}`);
  });

}

Budget.prototype.getTotalExpenses = function () {
  let total = 0;
  this.expenses.forEach(expense => {
    total += expense.getTotal();
  });
  return total;
}

Budget.prototype.redOrBlack = function () {
  let exp = this.getTotalExpenses();
  return (this.budget >= exp) ? 'In the black!' : 'In the red...';
};


// Expense Class
function Expense(name, total) {
  this.name = name;
  this.total = total;
}

Expense.prototype.getName = function () {
  return this.name;
}

Expense.prototype.getTotal = function () {
  return this.total;
}

Expense.prototype.info = function () {
  return `${this.name} : ${this.total}`;
}

let myBudget = new Budget(2000);
console.log(myBudget.getBudget());
myBudget.addExpense('gas', 25);
myBudget.addExpense('gas', 36);
myBudget.addExpense('takeout', 75);
myBudget.addExpense('groceries', 2500);


console.log(myBudget.getExpenses());
console.log(myBudget.getExpense('gas'));
console.log(myBudget.getExpense('takeout'));
console.log(myBudget.getExpense('groceries'));

console.log(myBudget.getTotalExpenses());
console.log(myBudget.redOrBlack());