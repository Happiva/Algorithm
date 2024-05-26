const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const [n] = input.shift().map((el) => parseInt(el));
  const board = input;
  const teachers = [];

  let answer = false;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'T') {
        teachers.push([i, j]);

        for (let d = 0; d < 4; d++) {
          const nextX = i + next[d];
          const nextY = j + next[(d + 1) % 4];

          if (isInRange(nextX, nextY) && board[nextX][nextY] === 'S') {
            console.log('NO');
            process.exit();
          }
        }
      }
    }
  }

  const check = () => {    
    let success = true;
    for (let t = 0; t < teachers.length; t++) {
      if (!success) break;

      const [x, y] = teachers[t];

      for (let d = x - 1; d >= 0; d--) {
        if (board[d][y] === 'O') break;

        if (board[d][y] === 'S') {
          success = false;
          break;
        }
      }

      for (let d = x + 1; d < n; d++) {
        if (board[d][y] === 'O') break;

        if (board[d][y] === "S") {
          success = false;
          break;
        }
      }

      for (let d = y - 1; d >= 0; d--) {
        if (board[x][d] === 'O') break;

        if (board[x][d] === "S") {
          success = false;
          break;
        }
      }

      for (let d = y + 1; d < n; d++) {
        if (board[x][d] === 'O') break;

        if (board[x][d] === "S") {
          success = false;
          break;
        }
      }
    }

    return success;
  };

  const dfs = (num) => {
    if (answer) return;

    if (num === 3) {
      answer = check();
      return;
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === "X") {
          board[i][j] = "O";
          dfs(num + 1);
          board[i][j] = "X";
        }
      }
    }
  };

  dfs(0);

  console.log(answer ? 'YES' : 'NO');
  process.exit();
});
