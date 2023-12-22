const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)))
}).on("close", function () {
  const [n, m] = input.shift();
  const board = [];
  const answer = [];
  const dp = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (let i = 0; i < n; i++) {
    board.push(input.shift());
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j] + board[i - 1][j - 1] - dp[i - 1][j - 1];
    }
  }

  for (let i = 0; i < m; i++) {
    const [x1, y1, x2, y2] = input[i];

    if (x1 === x2 && y1 === y2) {
      answer.push(board[x1 - 1][y1 - 1]);
      continue;
    }
    const foo = dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1];
    answer.push(foo);
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
