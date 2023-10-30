'use strict';
///////////////////////////////////// BANKIST APP ///////////

/////////////////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movements dates, currency and locale

const account1 = {
  owner: 'Paras Moulekhi',
  movements: [200, 455.23, -306.5, 25000, -642.21, 133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-08-18T21:31:17.178Z',
    '2022-08-23T07:42:02.383Z',
    '2022-08-23T09:15:04.904Z',
    '2023-08-23T10:17:24.185Z',
    '2023-08-23T14:11:59.604Z',
    '2023-08-30T17:01:17.194Z',
    '2023-08-31T23:36:17.929Z',
    '2023-09-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', //de-DE
};
const account2 = {
  owner: 'Jessica Devis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5, // %
  pin: 2222,

  movementsDates: [
    '2019-11-30T09:48:16.035Z',
    '2019-11-01T13:15:33.867Z',
    '2019-12-25T06:04:23.907Z',
    '2019-01-25T14:18:46.235Z',
    '2019-02-05T16:33:06.386Z',
    '2019-04-10T14:43:26.374Z',
    '2019-06-25T18:49:59.371Z',
    '2019-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US', //de-DE
};

const accounts = [account1, account2];

// const account1 = {
//   owner: 'Paras Moulekhi',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };
// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5, // %
//   pin: 2222,
// };
// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7, // %
//   pin: 3333,
// };
// const account4 = {
//   owner: 'Dara Singh Chauhan',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1, // %
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
////////////////////////////////////////////
////// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 24 * 60 * 60));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0; // text return krta hai
  // .innerHTML = HTML including sb cheeze deta hai

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDates = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(move, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDates}</div>
        <div class="movements__value">${formattedMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = formatCur(outcomes, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join(''); // join() method array me se element nikal kr unhe string me concat kr deta hai
  });
};
createUsernames(accounts);
console.log(accounts);

// Maximum value
// movements: [200, 450, -400, 3000, -650, -130, 70, 1300]
const max = account1.movements.reduce((acc, curr) => {
  if (curr > acc) return curr;
  else return acc;
}, account1.movements[0]);
console.log(max);

// chaining method -> All data transformation map, filter and reduce in one go.
const eurToUSD = 1.1;
console.log(account1.movements);

// Pipeline
const totalDepositUSD = account1.movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUSD;
  })
  // .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

// find method
// find(callBackFn) method --> it is like filter method but it returns only first element which satifies the condition otherwise undefined is returned.

const firstWithdrawal = account1.movements.find(mov => mov < 0);
console.log(account1.movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${second}`;

    // When 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    // Decrease 1 second
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////
// Event handlerS
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
/*
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100; */

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    /* const day = `${now.getDate()}`.padStart(2, 0);
     const month = `${now.getMonth() + 1}`.padStart(2, 0);
     const year = now.getFullYear();
     const hours = `${now.getHours()}`.padStart(2, 0);
     const minutes = `${now.getMinutes()}`.padStart(2, 0);
     labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`; */
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
      // weekday: 'long',
    };

    // locale coming from browsers
    /*const locale = navigator.language;
    console.log(locale);*/

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Call timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // it prevents form from reloading
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount >= 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(34);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );
  console.log(movementsUI);

  // 2nd way
  // const movementUI2 = [...document.querySelectorAll('.movements__value')].map(
  //   el => Number(el.textContent.replace('€', ''))
  // );
  // console.log(movementUI2);
});

// Excercise

//1.
const bankDepositSum = accounts
  .flatMap(mov => mov.movements)
  .reduce((sum, curr) => sum + curr, 0);
console.log(bankDepositSum);

//2.
// const numDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposit1000 = accounts
  .flatMap(mov => mov.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log(numDeposit1000);

// Pre and post increment operator
let a = 10;
// console.log(a++);//10
console.log(++a); //11
console.log(a); //11

//3.Making an objects in which sumWithdrawals and sumDeposits and it's advance case of reduce
const { deposits, withdrawals } = accounts
  .flatMap(mov => mov.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

//4. Create a simple function which converts a string into a title case
// this is a nice title -> This Is a Nice Title
const convertsTitleCase = function (title) {
  const capitalise = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalise(word)))
    .join(' ');
  return capitalise(titleCase);
};
console.log(convertsTitleCase('this is a nice title'));
console.log(convertsTitleCase('this is a LONG title but not too long'));
console.log(convertsTitleCase('and here is another title with an EXAMPLE'));

console.log(23 === 23.0); // JS says all numbers behaves like a floating number
// Base 10 - 0 to 9, 1/10 = 0.1, 3/10 = 0.333333
// Binary base 2- 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Conversion string to number
console.log(Number('23'));
console.log(+'23');

// Parsing
// Number.parseInt -> Number is object and parseInt is function
console.log(Number.parseInt('40px', 10)); // parseInt second argument is base 10 which is so called radics
console.log(Number.parseInt('er23', 10));

console.log(Number.parseInt(' 40.7rem'));
console.log(Number.parseFloat('  40.7rem  '));

// console.log(parseFloat('40.7rem'));

// Check if value is NaN
console.log(Number.isNaN(23)); // to check a number is not a number
console.log(Number.isNaN('23'));
console.log(Number.isNaN(+'23X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is Number
console.log(Number.isFinite(23));
console.log(Number.isFinite('15'));
console.log(Number.isFinite('15X'));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

// Math function
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));

console.log(8 ** (1 / 3));
console.log(Math.max(12, 34, 22, 11, 10, 76));
console.log(Math.max(12, 34, 22, 11, 10, '76')); // Posses type coercion
console.log(Math.max(12, 34, 22, 11, 10, '76X')); // Does not posses parsing

console.log(Math.min(12, 3, 45, 21, 44, 1));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0....1 -> 0...(max-min)->min...max
console.log(randomInt(10, 20));

// Rounding Integers
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.8)); //23

// floor and trunc are similar to each other and they both remove decimal part
console.log(Math.trunc(23.3)); //23

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24
console.log(Math.ceil(-23.3)); // -23

// Rounding Decimals/floating --> .toFixed(upto deciaml part) is a function
console.log((2.7).toFixed(0)); // toFixed returns a string...not number
console.log((2.7).toFixed(3)); // 2.700
console.log(+(2.345).toFixed(2)); // 2.35

// Remainder operator(%) -> It gives remainder
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

// To check Whether it is even or odd
console.log(6 % 2);
console.log(6 / 2); // 3 * 2 + 0

console.log(7 % 2);
console.log(7 / 2); // 3 * 2 + 1

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(89));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements_row')].forEach(function (row, i) {
    //0,2,4,6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    //0,3,6,9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// Numeric Seperator(_) -> It seperates the number by underscore(_).It makes informative and readability
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1);
console.log(transferFee2);

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000')); // Numeric seperator Does not work in string
console.log(parseInt('230_000')); //230

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
// Any number which is greater than max_safe_integer which is not safe and give incorrect value

// All are unsafe numbers
console.log(2 ** 53 + 0); // Incorrect
console.log(2 ** 53 + 1); // Incorrect
console.log(2 ** 53 + 2); // Incorrect
console.log(2 ** 53 + 3); // Incorrect
console.log(2 ** 53 + 4); // Incorrect

// BigInt
console.log(47382920582034239490432094329058324834732n);
console.log(BigInt(47382920582));

// Operation
console.log(10000n + 10000n);
console.log(348324983394328424320943209320201343328n * 100000n);
// console.log(Math.sqrt(16n));// give an error

const huge = 34834739309230920924237297129412n; // BigInt number
const num = 23; // Regular number
console.log(huge * BigInt(num)); // BigInt and other one is regular number both are different

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');
console.log(huge + ' is Really big!!!');

// Divisions
console.log(10n / 3n); // It takes closest number
console.log(10 / 3); //3.3333333333333333

// Creating date
/*
const now = new Date();
console.log(now);

console.log(new Date('Fri Sep 01 2023 12:48:15'));
console.log(new Date('November 22, 2000'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2023, 8, 1, 10, 12, 21)); // Here we can see month, cause it is 0 based
console.log(new Date(2023, 8, 31));

// new Date(millisecond); -> If we pass only one parameter it will treat as millisecond
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); 
*/

// Working with dates
/*
const future = new Date(2023, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // time stamp(in millisecond)
console.log(new Date(1700387580000));

console.log(Date.now()); // Gives us timeStamp

future.setFullYear(2024);
console.log(future);
*/

// Intl with NumberFormat()
const future = new Date(2023, 10, 19, 15, 23);
console.log(+future);

const num1 = 3884764.23;
const options = {
  style: 'currency', // unit,currency,percent
  unit: 'kilometer-per-hour',
  currency: 'EUR',
  // useGrouping: false,
};
console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num1));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num1));
console.log('India:   ', new Intl.NumberFormat('hi-IN', options).format(num1));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num1)
);

// Timers: setTimeout and setInterval

// setTimeout -> function/a piece of code runs after expire the timer
const ingredients = ['olive', 'corn'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your Pizza with 🍕 ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('corn')) clearTimeout(pizzaTimer);

// setInterval -> Over and Over executes
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

// setInterval(function () {
//   const now = new Date();
//   const hour = now.getHours();
//   const minute = now.getMinutes();
//   const second = now.getSeconds();

//   console.log(`${hour}:${minute}:${second}`);
// }, 1000);
