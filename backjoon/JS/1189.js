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
  const [r, c, k] = input.shift().split(' ').map((el) => parseInt(el));
  let answer = 0;

  const visited = new Array(r);
  for (let i = 0; i < r; i++) {
    const newArr = new Array(c).fill(false);
    visited[i] = newArr;
  }

  const goalX = 0;
  const goalY = c - 1;

  const isInRange = (x, y) => {
    return x >= 0 && y >= 0 && x < r && y < c;
  };

  const dfs = (x, y, num) => {
    if (x === goalX && y === goalY && num === k) {
      answer++;
    } else {
      visited[x][y] = true;
      for (let i = 0; i < 4; i++) {
        
        const nextX = x + nextCol[i];
        const nextY = y + nextRow[i];

        if (
          isInRange(nextX, nextY) &&
          !visited[nextX][nextY] &&
          input[nextX][nextY] === "."
        ) {
          visited[nextX][nextY] = true;
          dfs(nextX, nextY, num + 1);
          visited[nextX][nextY] = false;
        }
      }
      visited[x][y] = false;
    }
  };

  dfs(r - 1, 0, 1);
  console.log(answer);

  process.exit();
});
