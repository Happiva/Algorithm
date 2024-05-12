const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const board = input;
  const dpArr = Array.from(Array(n), () => Array(n).fill(-1));
  let answer = 1;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <=y && x < n && y < n;
  }

  const dfs = (x, y) => {
    if (dpArr[x][y] > -1) return dpArr[x][y];
    
    dpArr[x][y] = 1;
    for (let k = 0; k < 4; k++) {
      const nextX = x + next[k];
      const nextY = y + next[(k + 1) % 4];
      if (
        isInRange(nextX, nextY) &&
        board[x][y] < board[nextX][nextY]
      ) {
        let num = dfs(nextX, nextY) + 1;
        dpArr[x][y] = Math.max(dpArr[x][y], num);
        answer = Math.max(answer, dpArr[x][y]);
      }
    }

    return dpArr[x][y];
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dpArr[i][j] === -1) {
        dfs(i, j);
      }
    }
  }
  console.log(answer);
  
  process.exit();
});
