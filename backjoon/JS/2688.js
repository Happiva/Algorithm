const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const testcase = input.shift();
  const answer = [];

  const dp = new Array(65);

  for (let i = 0; i < 65; i++) {
    const newArr = new Array(10);
    if (i === 0) newArr.fill(0);
    dp[i] = newArr;
  }
  for (let i = 0; i < 10; i++) {
    dp[1][i] = 1;
    dp[2][i] = i + 1;
  }

  for (let i = 2; i <= 63; i++) {
    let sum = 0;
    for (let j = 0; j < 10; j++) {
      sum += dp[i][j];
      dp[i + 1][j] = sum;
    }
  }

  for (let i = 0; i < testcase; i++) {
    if (input[i] < 64) answer.push(dp[input[i] + 1][9]);
    else {
      let sum = 0;
      for (const el of dp[input[i]]) sum += el;
      answer.push(sum);
    }
  }

  console.log(answer.join('\n').trim());
  process.exit();
});
