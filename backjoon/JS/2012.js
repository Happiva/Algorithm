const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const n = input.shift();
  const sortedArr = input.sort((a, b) => a - b);
  let answer = 0;

  for (let i = 0; i < n; i++) {
    answer += Math.abs(sortedArr[i] - (i + 1));
  }

  console.log(answer);
  process.exit();
});
