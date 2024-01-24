const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const arr = input[0];
  const dp = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    let max = 0;
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        max = Math.max(max, dp[j]);
      }
    }
    dp[i] = max + arr[i];
  }

  console.log(Math.max(...dp));

  process.exit();
});
