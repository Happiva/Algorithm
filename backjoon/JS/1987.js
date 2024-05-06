const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];
const CHAR_CODE = 'A'.charCodeAt(0);

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [r, c] = input.shift().split(" ").map((el) => parseInt(el));
  const board = input.map((str) => str.split(''));
  let max = -Infinity;
  const visited = new Array(26).fill(false);
  const initialLocationIdx = board[0][0].charCodeAt(0) - CHAR_CODE;
  visited[initialLocationIdx] = true;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < r && y < c;
  };

  const dfs = (x, y, num) => {
    max = Math.max(num, max);

    for (let i = 0; i < 4; i++) {
      const nextX = x + next[i];
      const nextY = y + next[(i + 1) % 4];

      if (isInRange(nextX, nextY)) {
        const index = board[nextX][nextY].charCodeAt(0) - CHAR_CODE;

        if (!visited[index]) {
          visited[index] = true;
          dfs(nextX, nextY, num + 1);
          visited[index] = false;
        }
      }
    }
  };

  dfs(0, 0, 1);
  
  console.log(max);
  process.exit();
});
