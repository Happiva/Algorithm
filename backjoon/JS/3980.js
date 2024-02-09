const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [testCase] = input.shift();
  const answer = [];
  let max = Infinity;
  let selected = new Array(11).fill(false);

  const backtrack = (num, board, sum) => {
    if (num === 11) {
      max = Math.max(sum, max);
      return;
    }

    for (let j = 0; j < 11; j++) {
      if (board[num][j] !== 0 && !selected[j]) {
        selected[j] = true;
        backtrack(num + 1, board, sum + board[num][j]);
        selected[j] = false;
      }
    }
  };

  for (let i = 0; i < testCase; i++) {
    max = -Infinity;
    selected.fill(false);
    const board = input.splice(0, 11);
    backtrack(0, board, 0);
    answer.push(max);
  }

  console.log(answer.join('\n').trim());
  process.exit();
});
