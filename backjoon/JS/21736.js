const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

let nextCol = [-1, 0, 1, 0];
let nextRow = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(' ').map((el) => parseInt(el));
  const board = input.map((str) => str.split(''));
  let queue;
  let answer = 0;
  const visited = new Array(n);
  for (let i = 0; i < n; i++) visited[i] = new Array(m).fill(false);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 'I') {
        queue = [[i, j]];
        visited[i][j] = true;
        break;
      }
    }
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && n > x && m > y;
  }

  while (queue.length > 0) {
    const [currentX, currentY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nextX = nextCol[i] + currentX;
      const nextY = nextRow[i] + currentY;

      if (isInRange(nextX, nextY) && !visited[nextX][nextY] && board[nextX][nextY] !== 'X') {
        queue.push([nextX, nextY]);
        visited[nextX][nextY] = true;
        if (board[nextX][nextY] === 'P') answer++;
      }
    }
  }

  if (answer === 0) console.log('TT');
  else console.log(answer);
  process.exit();
});
