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
  const [row, col] = input.shift();
  let board = input;
  let newBoard = Array.from(Array(row), () => Array(col).fill(0));
  let visited = Array.from(Array(row), () => Array(col).fill(false));
  let time = 0;

  const bfs = (startX, startY) => {
    let queue = [[startX, startY]];

    visited[startX][startY] = true;
    let isAllMelted = true;

    while (queue.length > 0) {
      const [currentX, currentY] = queue.shift();
      let count = 0;
      
      for (let k = 0; k < 4; k++) {
        const nextX = currentX + next[k];
        const nextY = currentY + next[(k + 1) % 4];

        if (nextX >= 0 && nextY >= 0 && nextX < row && nextY < col) {
          if (board[nextX][nextY] === 0) count++;
          else if (board[nextX][nextY] > 0 && !visited[nextX][nextY]) {
            queue.push([nextX, nextY]);
            visited[nextX][nextY] = true;
          }
        }
      }
      newBoard[currentX][currentY] = Math.max(
        0,
        board[currentX][currentY] - count
      );
      if (newBoard[currentX][currentY] > 0) isAllMelted = false;
    }

    return isAllMelted;
  };

  while (true) {
    let num = 0; // 빙산 개수
    visited.forEach((arr) => arr.fill(false));
    newBoard = Array.from(Array(row), () => Array(col).fill(0));
    let isAllMelted = true;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (!visited[i][j] && board[i][j] > 0) {
          num++;
          isAllMelted = bfs(i, j);
        }
      }
    }
    board = newBoard;

    if (num >= 2) {
      break;
    }
    if (isAllMelted) {
      time = null;
      break;
    };
    time++;
  }

  console.log(time ?? 0);
  process.exit();
});
