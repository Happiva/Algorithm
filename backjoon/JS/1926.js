const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [1, 0, -1, 0];
const nextRow = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift(); // 세로 가로

  const visited = new Array(n);
  
  for (let i = 0; i < n; i++) {
    const newArr = new Array(m).fill(false);
    visited[i] = newArr;
  }
  
  let max = 0; // 그림 넓이의 최대값
  let pictures = 0; // 그림 총 개수

  const isInRange = (x, y) => {
    return (x >= 0 && y >= 0 && x < n && y < m);
  };

  const bfs = (x, y) => {
    let num = 1;
    visited[x][y] = true;
    let queue = [[x, y]];

    while (queue.length > 0) {
      const [currentX, currentY] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const nextX = currentX + nextCol[k];
        const nextY = currentY + nextRow[k];

        if (isInRange(nextX, nextY) && !visited[nextX][nextY] && input[nextX][nextY] === 1) {
          visited[nextX][nextY] = true;
          num++;
          queue.push([nextX, nextY]);
        }
      }
    }
    return num;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && input[i][j] === 1) {
        pictures++;
        const num = bfs(i, j);
        max = Math.max(num, max);
      }
    }
  }

  console.log(pictures);
  console.log(max);

  process.exit();
});
