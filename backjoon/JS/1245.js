const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  let answer = 0;
  const visited = Array.from(Array(n), () => Array(m).fill(false));

  let queue = [];

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };

  const bfs = (x, y) => {
    queue = [[x, y, input[x][y]]];
    let isTop = true;

    while (queue.length > 0) {
      const [currentX, currentY, num] = queue.shift();

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          if (k === 1 && l === 1) continue;

          const nextX = currentX + next[k];
          const nextY = currentY + next[l];

          if (isInRange(nextX, nextY)) {
            if (input[nextX][nextY] > num) isTop = false;
            if (input[nextX][nextY] === num && !visited[nextX][nextY]) {
              queue.push([nextX, nextY, num]);
              visited[nextX][nextY] = true;
            }
          }
        }
      }
    }

    if (isTop && input[x][y] > 0) answer ++;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j]) {
        bfs(i, j);
      }
    }
  }

  console.log(answer);
  process.exit();
});
