const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextRow = [-1, 0, 1, 0];
const nextCol = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line.split(""));
}).on("close", function () {
  const n = parseInt(input.shift().join(''));
  const visited = [];

  for (let i = 0; i < n; i++) {
    const newArr = new Array(n).fill(false);
    visited.push(newArr);
  }

  let a = 0,
    b = 0;

  const BFS = (i, j) => {
    const target = input[i][j];
    visited[i][j] = true;
    let queue = [[i, j]];

    while (queue.length > 0) {
      const [currentX, currentY] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const nextX = currentX + nextRow[k];
        const nextY = currentY + nextCol[k];

        if (!(nextX < 0 || nextY < 0 || nextX >= n || nextY >= n)) {
          if (input[nextX][nextY] === target && !visited[nextX][nextY]) {
            visited[nextX][nextY] = true;
            queue.push([nextX, nextY]);
          }
        }
      }
    };
  }

  // 1. 색약이 아닌 경우
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        BFS(i, j);
        a++;
      }
    }
  }

  // 초기화
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      visited[i][j] = false;
      if (input[i][j] === 'G') input[i][j] = 'R';
    }
  }

  // 2. 적록색약인 경우
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        BFS(i, j);
        b++;
      }
    }
  }

  console.log(a, b);

  process.exit();
});
