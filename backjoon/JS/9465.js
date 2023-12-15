const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const testCase = parseInt(input.shift());
  const answer = [];

  for (let i = 0; i < testCase; i++) {
    const n = parseInt(input.shift());

    const board = [];
    const dp = [];

    // 배열 초기화
    for (let j = 0; j < 2; j++) {
      board.push(
        input
          .shift()
          .split(" ")
          .map((el) => parseInt(el))
      );
    }

    if (n === 1) {
      answer.push(board[0][0] > board[1][0] ? board[0][0] : board[1][0]);
      continue;
    }

    dp[0] = [0, board[0][0], board[1][0]];

    for (let j = 1; j < n; j++) {
      dp[j] = [ Math.max(...dp[j - 1]), Math.max(dp[j - 1][0], dp[j - 1][2]) + board[0][j], Math.max(dp[j - 1][0], dp[j - 1][1]) + board[1][j] ];
    }

    answer.push(Math.max(...dp[n - 1]));
  }

  console.log(answer.join('\n'));

  process.exit();
});
