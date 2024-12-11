const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [m, n] = input.shift();
  const arr = input.shift();

  let start = 0, end = 1000000000;
  let answer = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const sumOfSnack = arr.reduce((acc, cur) => {
      if (cur >= mid) {
        acc += Math.floor(cur / mid);
      }
      return acc;
    }, 0);

    if (m <= sumOfSnack) {
      start = mid + 1;
      answer = Math.max(mid, answer);
    } else {
      end = mid - 1;
    }
  }

  console.log(answer);
  process.exit();
});
