const readline = require("readline");
const rl = readline.createInterface({
  input: fprocess.stdin,
  output: process.stdout,
});

let input = [];
const next = [0, 1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => {
    if (el !== '-' && el !== '+' && el !== '*') return parseInt(el);
    else return el;
  }));
}).on("close", function () {
  const n = input.shift()[0];
  const board = input;

  let max = -Infinity, min = Infinity;

  const visited = Array.from(Array(n), () => Array(n).fill(false));

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  }

  const dfs = (x, y, current) => {
    if (x === n - 1 && y === n - 1) {
      max = Math.max(current, max);
      min = Math.min(current, min);
    } else {
      visited[x][y] = true;
      for (let i = 0; i < 2; i++) {
        const nextX = x + next[i];
        const nextY = y + next[(i + 1) % 2];

        if (isInRange(nextX, nextY) && !visited[nextX][nextY]) {
          if (
            board[x][y] === "+" ||
            board[x][y] === "-" ||
            board[x][y] === "*"
          ) {
            let newValue = current;
            if (board[x][y] === "+") {
              newValue += board[nextX][nextY];
            } else if (board[x][y] === "-") {
              newValue -= board[nextX][nextY];
            } else {
              newValue *= board[nextX][nextY];
            }

            visited[nextX][nextY] = true;
            dfs(nextX, nextY, newValue);
            visited[nextX][nextY] = false;
          } else {
            visited[nextX][nextY] = true;
            dfs(nextX, nextY, current);
            visited[nextX][nextY] = false;
          }
        }
      }
    }
  };

  visited[0][0] = true;
  dfs(0, 0, board[0][0]);

  console.log(`${max} ${min}`);
  process.exit();
});
