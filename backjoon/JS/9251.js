const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const str1 = input[0];
  const str2 = input[1];

  let dp = new Array(str1.length + 1);
  for (let i = 0; i < str1.length + 1; i++) {
    dp[i] = new Array(str2.length + 1).fill(0);
  }
  
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }

  console.log(dp[str1.length][str2.length]);
  process.exit();
});
