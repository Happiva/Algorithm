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
  let sum = 0;
  const sortedArr = input.sort((a, b) => b - a);
  
  for (let i = 0; i < n; i++) {
    sum += Math.max(sortedArr[i] - i, 0);
  }

  console.log(sum);
  process.exit();
});
