const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const board = [];
  const n = parseInt(input.shift());
  input.forEach((str) => {
    board.push(str.split("").map((el) => parseInt(el)));
  });
  const visited = [];
  for (let i = 0; i < n; i++) {
    const newArr = new Array(n);
    visited.push(newArr.fill(false));
  }

  let queue = [];
  const answer = [];
  let num = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && board[i][j]) {
        queue = [[i, j]];
        visited[i][j] = true;
        num = board[i][j];

        while (queue.length > 0) {
          const [currentX, currentY] = queue.shift();
          if (currentY + 1 < n) {
            if (
              board[currentX][currentY + 1] &&
              !visited[currentX][currentY + 1]
            ) {
              visited[currentX][currentY + 1] = true;
              num++;
              queue.push([currentX, currentY + 1]);
            }
          }

          if (currentX + 1 < n) {
            if (
              board[currentX + 1][currentY] &&
              !visited[currentX + 1][currentY]
            ) {
              visited[currentX + 1][currentY] = true;
              num++;
              queue.push([currentX + 1, currentY]);
            }
          }

          if (currentY - 1 >= 0) {
            if (
              board[currentX][currentY - 1] &&
              !visited[currentX][currentY - 1]
            ) {
              visited[currentX][currentY - 1] = true;
              num++;
              queue.push([currentX, currentY - 1]);
            }
          }

          if (currentX - 1 >= 0) {
            if (
              board[currentX - 1][currentY] &&
              !visited[currentX - 1][currentY]
            ) {
              visited[currentX - 1][currentY] = true;
              num++;
              queue.push([currentX - 1, currentY]);
            }
          }
        }
        if (num > 0) {
          answer.push(num);
        }
      }
    }
  }

  console.log(answer.length);
  console.log(answer.sort((a, b) => a - b).join('\n').trim());

  process.exit();
});
