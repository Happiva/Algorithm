const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, s, m] = input.shift();
  const arr = input[0];

  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    const newArr = new Array(1001).fill(false);
    dp[i] = newArr;
  }

  if (s + arr[0] <= m) {
    const idx = s + arr[0];
    dp[0][idx] = true;
  }
  if (s - arr[0] >= 0) {
    const idx = s - arr[0];
    dp[0][idx] = true;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 1001; j++) {
      let idx;
      if (dp[i - 1][j] && j + arr[i] <= m) {
        idx = j + arr[i];
        dp[i][idx] = true;
      }
      if (dp[i - 1][j] && j - arr[i] >= 0) {
        idx = j - arr[i];
        dp[i][idx] = true;
      }
    }
  }
  let answer;
  for (let i = 0; i < 1001; i++) {
    if (dp[n - 1][i]) answer = i;
  }

  console.log(answer ?? -1);

  process.exit();
});
