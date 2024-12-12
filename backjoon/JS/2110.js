const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, c] = input.shift().split(' ').map(el => parseInt(el));
  const inputArr = input.map(el => parseInt(el)).sort((a, b) => a - b);

  if (c === 2) {
    console.log(inputArr[inputArr.length - 1] - inputArr[0]);
    process.exit();
  }

  if (c === n) {
    let min = Infinity;
    for (let i = 0; i < n - 1; i++) {
      min = Math.min(inputArr[i + 1] - inputArr[i]);
    }
    console.log(min);
    process.exit();
  }

  let answer = -Infinity;
  let start = 1, end = inputArr[n - 1] - inputArr[0];

  const checkIsPossible = (distance) => {
    let count = 1;
    let prev = inputArr[0];

    for (let i = 1; i < n; i++) {
      if (inputArr[i] - prev >= distance) {
        count++;
        prev = inputArr[i];
      }
    }

    return count;
  };

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const count = checkIsPossible(mid);
    if (count >= c) {
      start = mid + 1;

      answer = Math.max(answer, mid);
    } else {
      end = mid - 1;
    }
  }

  console.log(answer);
  process.exit();
});
