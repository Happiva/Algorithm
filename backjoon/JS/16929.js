const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(' ').map((el) => parseInt(el));
  const board = input.map((str) => str.split(''));
  let visited = Array.from(Array(n), () => Array(m).fill(false));

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };

  const dfs = (startX, startY, x, y, num) => {
    visited[x][y] = true;

    for (let k = 0; k < 4; k++) {
      const nextX = x + next[k];
      const nextY = y + next[(k + 1) % 4];

      if (
        isInRange(nextX, nextY) &&
        board[nextX][nextY] === board[startX][startY]
      ) {
        if (!visited[nextX][nextY]) {
          dfs(startX, startY, nextX, nextY, num + 1);
        } else if (startX === nextX && startY === nextY && num >= 4) {
          console.log('Yes');
          process.exit();
        }
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      visited.forEach((arr) => arr.fill(false));

      dfs(i, j, i, j, 1);
    }
  }

  console.log('No');
  process.exit();
});
