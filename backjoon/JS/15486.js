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
  const dp = new Array(n + 1).fill(0);
  let max = 0;

  for (let i = 0; i <= n; i++) {
    max = Math.max(max, dp[i]);

    if (i === n) continue;
    const [time, cost] = input[i];

    if (i + time > n) continue;

    dp[i + time] = Math.max(dp[i + time], max + cost);
  }

  console.log(max);

  process.exit();
});
