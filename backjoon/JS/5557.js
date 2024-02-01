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

  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(21).fill(BigInt(0));
  }
  dp[0][arr[0]] = BigInt(1);

  for (let i = 1; i < n - 1; i++) {
    for (let j = 0; j < 21; j++) {
      if (dp[i - 1][j]) {
        const plus = j + arr[i];
        const minus = j - arr[i];

        if (plus >= 0 && plus <= 20) {
          dp[i][plus] += dp[i - 1][j];
        }
        if (minus >= 0 && minus <= 20) {
          dp[i][minus] += dp[i - 1][j];
        }
      }
    }
  }

  console.log(dp[n - 2][arr[n - 1]].toString());
  
  process.exit();
});
