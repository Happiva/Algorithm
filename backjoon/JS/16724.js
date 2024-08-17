const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const next = [-1, 0, 1, 0];
const NEXT_POSITION = {
  U: 0,
  D: 2,
  R: 1,
  L: 3,
}

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  let answer = 0;
  const [n, m] = input.shift().split(' ').map(el => parseInt(el));
  const board = input.map(line => line.split(''));
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  let loop = 0;

  const dfs = (x, y) => {
    visited[x][y] = loop + 1;

    let nextX = x + next[NEXT_POSITION[board[x][y]]];
    let nextY = y + next[(NEXT_POSITION[board[x][y]] + 1) % 4];

    if (!visited[nextX][nextY]) {
      dfs(nextX, nextY);
    } else {
      if (visited[nextX][nextY] === loop + 1) {
        answer++;
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dfs(i, j);
      loop++;
    }
  }

  console.log(answer);
  process.exit();
});
