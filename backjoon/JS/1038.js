const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  if (0 <= input && input <= 10) {
    console.log(input);
    process.exit();
  }

  const getPermutation = (n, r) => {
    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= (n - i);
    }

    return result;
  };

  const numForDigit = {};
  for (let i = 1; i <= 10; i++) {
    numForDigit[i] = getPermutation(10, i) / getPermutation(i, i);
  }

  let digit, sum = -1;
  for (let i = 1; i < 10; i++) {
    sum += numForDigit[i];
    if (sum < input && input <= sum + numForDigit[i + 1]) {
      digit = i + 1;
      break;
    }
  }

  if (digit == null) {
    console.log(-1);
    process.exit();
  }

  let end = sum + 1 + numForDigit[digit];
  let hasFound = false, answer;

  const search = (prev, num, str) => {
    if (hasFound) return;
    if (num === digit) {
      end--;

      if (end === input) {
        hasFound = true;
        answer = str;
        return;
      }
    }
    
    for (let j = prev - 1; j >= 0; j--) {
      search(j, num + 1, `${str}${j}`);
    }
  };

  for (let i = 9; i > 0; i--) {
    if (hasFound) break;
    search(i, 1, i.toString());
  }

  console.log(answer);
  process.exit();
});
