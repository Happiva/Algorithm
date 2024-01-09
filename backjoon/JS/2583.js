const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [0, -1, 0, 1];
const nextRow = [1, 0, -1, 0];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [m, n, k] = input.shift();
  let answer = [];

  const visited = new Array(m);
  const board = new Array(m);
  for (let i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
    board[i] = new Array(n).fill(1);
  }

  for (let i = 0; i < k; i++) {
    const [x1, y1, x2, y2] = input[i];
    for (let x = y1; x < y2; x++) {
      for (let y = x1; y < x2; y++) {
        board[x][y] = 0;
      }
    }
  }

  const isInRange = (x, y) => {
    return x >= 0 && y >= 0 && x < m && y < n;
  };
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && board[i][j] === 1) {
        let queue = [[i, j]];
        visited[i][j] = true;
        let num = 1;

        while (queue.length > 0) {
          const [currentX, currentY] = queue.shift();

          for (let k = 0; k < 4; k++) {
            const nextX = currentX + nextCol[k];
            const nextY = currentY + nextRow[k];

            if (isInRange(nextX, nextY) && !visited[nextX][nextY] && board[nextX][nextY] === 1) {
              queue.push([nextX, nextY]);
              num++;
              visited[nextX][nextY] = true;
            }
          }
        }
        answer.push(num);
      }
    }
  }
  console.log(answer.length);
  console.log(answer.sort((a, b) => a - b).join(' ').trim());

  process.exit();
});
