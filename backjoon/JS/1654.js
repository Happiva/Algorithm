const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [k, n] = input
    .shift()
    .split(" ")
    .map((el) => parseInt(el));
  const inputArr = input.map((el) => parseInt(el)).sort((a, b) => a - b);
  let answer = -Infinity;

  let start = 1, end = inputArr[inputArr.length - 1];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const divided = inputArr
      .map((el) => Math.floor(el / mid))
      .reduce((acc, cur) => {
        acc += cur;
        return acc;
      }, 0);

    if (divided >= n) {
      answer = Math.max(answer, mid);
      start = mid + 1;
    } else if (divided < n) {
      end = mid - 1;
    }
  }

  console.log(answer);
  process.exit();
});
