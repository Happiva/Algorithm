const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const nextRow = [-1, 0, 1, 0];
const nextCol = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  let startX, startY;
  let answer = [];
  const visited = [];
  for (let i = 0; i < n; i++) {
    const newArr = new Array(m).fill(-1);
    visited.push(newArr);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (input[i][j] === 2) {
        startX = i;
        startY = j;
      }
      if (input[i][j] === 0) {
        visited[i][j] = 0;
      }
    }
  }

  const queue = [[startX, startY]];
  let front = 0, rear = 1;
  visited[startX][startY] = 0;

  while (front !== rear) {
    const [x, y] = queue[front++];

    for (let i = 0; i < 4; i++) {
      const nextX = x + nextCol[i];
      const nextY = y + nextRow[i];
      if (!(nextX < 0 || nextY < 0 || nextX > n - 1 || nextY > m - 1)) {
        if (input[nextX][nextY] === 1 && visited[nextX][nextY] < 0) {
          visited[nextX][nextY] = visited[x][y] + 1;
          queue[rear++] = [nextX, nextY];
        }
      }
    }
  }

  for (arr of visited) {
    answer.push(arr.join(' '));
  }
  console.log(answer.join('\n').trim());

  process.exit();
});
