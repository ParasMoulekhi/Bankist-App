'use strict';
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// DATA

const account1 = {
  owner: 'Paras Moulekhi',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5, // %
  pin: 2222,
};
const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7, // %
  pin: 3333,
};
const account4 = {
  owner: 'Dara Singh Chauhan',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1, // %
  pin: 4444,
};

const eurToUSD = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });
const movementsUSD = movements.map(mov => mov * eurToUSD);
console.log(movements);
console.log(movementsUSD);

// for of loop
const movementsUSDfor = [];
for (const move of movements) movementsUSDfor.push(move * eurToUSD);
console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movements ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);

// filter()
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposit);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawal = movements.filter(mov => mov < 0);
console.log(movements);
console.log(withdrawal);

// reduce()
// accumulator --> snowball
console.log(movements);
// const balance = movements.reduce(function (acc, curr, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + curr;
// }, 0);
// console.log(balance);

// arrow function use
const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

console.log(movements);

// Equality
console.log(movements.includes(-130)); // true
console.log(movements.indexOf(-130)); //5

// SOME: CONDITION Check and SOME AND EVERY MEHTODS ARE COUSIN BROTHER
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// EVERY -- it returns true when an array every elements satisfies the conditon or pass the function
/* and it is preety similar to some() method */

console.log(movements.every(mov => mov > 0)); // False
console.log(account4.movements.every(mov => mov > 0));

// SEPERATELY CALLBACK
const threSholdNum = number => number < 40;
const digits = [1, 31, 21, 39, 35, 10];

console.log(digits.every(threSholdNum));
console.log(digits.some(threSholdNum));
console.log(digits.filter(threSholdNum));

/* Flat() -> It removes the nested part and convert it into flatend array and 
it is only for one level nested  and we passed as an argument for deep down*/
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // flats are only one which we used for deep down

/* flatMap() -> It is method which combine the map and flat method and it is only for one level deep 
and we can't go deep down in this method */

//Sorting -> sort() method also mutates the original array and returns perfect order
//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);
// return < 0, A, B (Keep order)
// return > 0, B, A (Switch order)

// Ascending
// movements.sort((a, b) => {
//   if (b > a) return -1;
//   if (a > b) return 1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (b > a) return 1;
//   if (a > b) return -1;
// });
movements.sort((a, b) => -(a - b));
console.log(movements);

//new array -> it makes new array.
const arR = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

// Empty array + filling array
const x = new Array(7); // 7 length empty array
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 4, 7);
console.log(x);

arR.fill(23, 4, 5);
console.log(arR);

/* Array.from -> Construct or recreate or creates a new, shallow copied of an array
from is not a method it is a constructor and return a new array
Array.from(arrayLike,mapFn) */
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// Make an array
const z = Array.from({ length: 9 }, (_, i) => i + 1); // we use '_' convention instead of curr element but if only we do not use curr value
console.log(z);
