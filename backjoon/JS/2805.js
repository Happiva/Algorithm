const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  const arr = input.shift().sort((a, b) => a - b);

  let start = 0, end = arr[n - 1];
  let answer = -Infinity;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
  
    const sum = arr.reduce((acc, cur) => {
      if (cur > mid) acc += (cur - mid);
      return acc;
    }, 0);

    if (sum >= m) {
      answer = Math.max(mid, answer);
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  console.log(answer);
  process.exit();
});
