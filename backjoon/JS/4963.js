const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [-1, -1, -1, 0, 0, 1, 1, 1];
const nextRow = [-1, 0, 1, -1, 1, -1, 0, 1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  let answer = [];

  while (true) {
    const [w, h] = input.shift();
    if (w === 0 && h === 0) break;

    const board = input.splice(0, h);
    const visited = new Array(h);
    let islands = 0;

    const isInRange = (x, y) => {
      return 0 <= x && 0 <= y && x < h && y < w;
    };

    for (let i = 0; i < h; i++) visited[i] = new Array(w).fill(false);
    let queue;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (!visited[i][j] && board[i][j] === 1) {
          queue = [[i, j]];
          visited[i][j] = true;

          while (queue.length > 0) {
            const [currentX, currentY] = queue.shift();
            for (let k = 0; k < 8; k++) {
              const nextX = currentX + nextCol[k];
              const nextY = currentY + nextRow[k];

              if (isInRange(nextX, nextY) && !visited[nextX][nextY] && board[nextX][nextY]) {
                queue.push([nextX, nextY]);
                visited[nextX][nextY] = true;
              }
            }
          }
          islands++;
        }
      }
    }
    answer.push(islands);
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
