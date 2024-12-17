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
  const [n, l, r] = input.shift();
  const board = input;
  let visited = Array.from(Array(n), () => Array(n).fill(false));
  let answer = 0;
  let isMoved = true;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  }

  const bfs = (startX, startY, target) => {
    const queue = [[startX, startY]];
    visited[startX][startY] = target;
    let sum = 0;
    let totalCountries = 1;

    while (queue.length) {
      const [curX, curY] = queue.shift();
      sum += board[curX][curY];

      for (let d = 0; d < 4; d++) {
        const nextX = curX + next[d];
        const nextY = curY + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY)
          && visited[nextX][nextY] === false
          && Math.abs(board[curX][curY] - board[nextX][nextY]) <= r
          && l <= Math.abs(board[curX][curY] - board[nextX][nextY])
        ) {
          totalCountries++;
          queue.push([nextX, nextY]);
          visited[nextX][nextY] = target;
        }
      }
    }

    return [sum, totalCountries];
  };

  const populationMovement = (sum, totalCountries, target) => {
    const moved = Math.floor(sum / totalCountries);

    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        if (visited[x][y] === target) {
          board[x][y] = moved;
        }
      }
    }
  };

  while (isMoved) {
    isMoved = false;
    let target = 1;
    visited = Array.from(Array(n), () => Array(n).fill(false));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!visited[i][j]) {
          const [sum, totalCountries] = bfs(i, j, target);

          if (totalCountries > 1) {
            isMoved = true;
            populationMovement(sum, totalCountries, target);
          }
          target++;
        }
      }
    }

    if (isMoved) answer++;
  }

  console.log(answer);
  process.exit();
});
