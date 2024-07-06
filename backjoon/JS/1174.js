const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {  
  if (1 <= input && input <= 10) {
    console.log(input - 1);
    process.exit();
  }

  let answer = -1;

  const getPermutation = (n, r) => {
    let sum = 1;

    for (let i = 0; i < r; i++) {
      sum *= (n - i);
    }

    return sum;
  };

  const numForDigit = {};
  numForDigit[1] = 10;

  for (let digit = 2; digit <= 10; digit++) {
    numForDigit[digit] = getPermutation(10, digit) / getPermutation(digit, digit);
  }

  let sum = 0, digit = -1, hasFound = false;
  for (let n = 2; n <= 10; n++) {
    sum += numForDigit[n - 1];
    if (sum < input && input <= sum + numForDigit[n]) {
      digit = n;
      break;
    }
  }

  if (digit === -1) {
    console.log(-1);
    process.exit();
  }

  const search = (last, str) => {
    if (hasFound) return;

    if (str.length === digit) {
      sum++;

      if (sum === input) {
        answer = str;
        hasFound = true;
        return;
      }
    }

    for (let j = 0; j < last; j++) {
      search(j, `${str}${j}`);
    }
  };

  for (let i = 1; i < 10; i++) {
    if (hasFound) break;
    search(i, i.toString());
  }

  console.log(answer);
  process.exit();
});
