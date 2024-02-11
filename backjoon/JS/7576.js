const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const nextCol = [-1, 0, 1, 0];
const nextRow = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [m, n] = input.shift();
  let tomatoes = 0;
  let answer = -Infinity;

  let queue = [];
  let top = -1, rear = -1;
  const visited = Array.from(Array(n), () => Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (input[i][j] === 0) tomatoes++;
      if (input[i][j] === 1) {
        queue[++rear] = [i, j, 0];
        visited[i][j] = 1;
      }
    }
  }
  if (tomatoes === 0) {
    console.log(0);
    process.exit();
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };

  while (top !== rear) {
    const [currentX, currentY, num] = queue[++top];

    for (let i = 0; i < 4; i++) {
      const nextX = currentX + nextCol[i];
      const nextY = currentY + nextRow[i];

      if (isInRange(nextX, nextY) && !visited[nextX][nextY] && input[nextX][nextY] === 0) {
        queue[++rear] = [nextX, nextY, num + 1];
        tomatoes--;
        visited[nextX][nextY] = num + 1;
      }
    }
  }

  if (tomatoes !== 0) {
    console.log(-1);
    process.exit();
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (answer < visited[i][j]) answer = visited[i][j];
    }
  }
  console.log(answer);

  process.exit();
});
