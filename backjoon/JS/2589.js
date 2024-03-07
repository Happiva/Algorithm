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
  const [col, row] = input.shift().split(' ').map((el) => parseInt(el));
  let answer = 0;

  const board = input.map((el) => el.split(''));
  const visited = Array.from(Array(col), () => Array(row).fill(false));

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < col && y < row;
  }

  const bfs = (startX, startY) => {
    let queue = [[startX, startY, 0]];

    visited.forEach((arr) => arr.fill(false));
    visited[startX][startY] = true;

    while (queue.length > 0) {
      const [currentX, currentY, dis] = queue.shift();
      answer = Math.max(dis, answer);

      for (let k = 0; k < 4; k++) {
        const nextX = currentX + next[k];
        const nextY = currentY + next[(k + 1) % 4];

        if (isInRange(nextX, nextY) && board[nextX][nextY] === 'L' && !visited[nextX][nextY]) {
          queue.push([nextX, nextY, dis + 1]);
          visited[nextX][nextY] = true;
        }
      }
    }
  };

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (board[i][j] === 'L') {
        bfs(i, j);
      }
    }
  }

  console.log(answer);
  process.exit();
});
