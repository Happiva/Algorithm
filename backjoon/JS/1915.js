const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(' ').map((el) => parseInt(el));
  const board = input.map((line) => line.split('').map((el) => parseInt(el)));
  let max = board[0][0];

  const dpArr = Array.from(Array(n), () => Array(m).fill(0));
  for (let i = 0; i < m; i++) {
    dpArr[0][i] = board[0][i];
  }
  for (let i = 0; i < n; i++) {
    dpArr[i][0] = board[i][0];
  }
  
  if (n === 1 && m === 1) {
    console.log(Math.pow(max, 2));
    process.exit();
  }

  if (n === 1) {
    for (let i = 0; i < m; i++) {
      max = Math.max(max, board[0][i]);
    }
    console.log(max);
    process.exit();
  }

  if (m === 1) {
    for (let i = 0; i < n; i++) {
      max = Math.max(max, board[i][0]);
    }
    console.log(max);
    process.exit();
  }

  const getLength = (x, y) => {
    if (
      dpArr[x][y - 1] === dpArr[x - 1][y] &&
      dpArr[x][y - 1] === dpArr[x - 1][y - 1] &&
      dpArr[x - 1][y - 1] === dpArr[x - 1][y]
    ) {
      return dpArr[x - 1][y - 1] + 1;
    } else if (Math.min(dpArr[x - 1][y - 1], dpArr[x - 1][y], dpArr[x][y - 1]) >= 1) {
      return Math.min(dpArr[x - 1][y - 1], dpArr[x - 1][y], dpArr[x][y - 1]) + 1;
    }
    return 1;
  };

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (board[i][j] === 1) {
        dpArr[i][j] = getLength(i, j);
        max = Math.max(max, dpArr[i][j]);
      }
    }
  }

  console.log(Math.pow(max, 2));
  process.exit();
});
