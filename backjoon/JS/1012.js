const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextRow = [1, 0, -1, 0];
const nextCol = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [t] = input.shift();
  let answer = [];

  for (let i = 0; i < t; i++) {
    const [row, col, k] = input.shift();
    const location = input.slice(0, k);
    input = input.slice(k);

    const board = new Array(col);
    const visited = new Array(col);
    let num = 0;

    for (let j = 0; j < col; j++) {
      const newArr = new Array(row).fill(0);
      const visitedArr = new Array(row).fill(false);
      board[j] = newArr;
      visited[j] = visitedArr;
    }

    for (let j = 0; j < k; j++) {
      const [x, y] = location[j];

      board[y][x] = 1;
    }

    const isInRange = (x, y) => {
      return (x >= 0 && y >= 0 && x < col && y < row);
    };

    for (let a = 0; a < col; a++) {
      for (let b = 0; b < row; b++) {
        if (!visited[a][b] && board[a][b] === 1) {
          let queue = [[a, b]];
          visited[a][b] = true;

          while (queue.length) {
            const [currentX, currentY] = queue.shift();

            for (let c = 0; c < 4; c++) {
              const nextX = currentX + nextRow[c];
              const nextY = currentY + nextCol[c];

              if (isInRange(nextX, nextY) && !visited[nextX][nextY] && board[nextX][nextY] === 1) {
                visited[nextX][nextY] = true;
                queue.push([nextX, nextY]);
              }
            }
          }
          num++;
        }
      }
    }
    answer.push(num);
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
