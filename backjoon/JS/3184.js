const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [-1, 0, 1, 0];
const nextRow = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [r, c] = input.shift().split(' ').map((el) => parseInt(el));
  let sheep = 0, wolf = 0;
  const board = input.map((str) => str.split(''));
  let visited = new Array(r);
  for (let i = 0; i < r; i++) {
    visited[i] = new Array(c).fill(false);
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < r && y < c;
  };

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (!visited[i][j] && board[i][j] !== '#') {
        let queue = [[i, j]];
        visited[i][j] = true;
        let s = 0, w = 0;

        while (queue.length > 0) {
          const [currentX, currentY] = queue.shift();

          if (board[currentX][currentY] === 'o') s++;
          else if (board[currentX][currentY] === 'v') w++;

          for (let k = 0; k < 4; k++) {
            const nextX = nextCol[k] + currentX;
            const nextY = nextRow[k] + currentY;

            if (isInRange(nextX, nextY) && board[nextX][nextY] !== '#' && !visited[nextX][nextY]) {
              queue.push([nextX, nextY]);
              visited[nextX][nextY] = true;
            }
          }
        }
        if (s > w) sheep += s;
        else wolf += w;
      }
    }
  }

  console.log(sheep, wolf);

  process.exit();
});
