const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const nextRow = [-1, 0, 1, 0];
const nextCol = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(' ').map((el) => parseInt(el));

  const board = input.map((str) => str.split(''));
  let white = 0, blue = 0;

  const visited = new Array(m);
  for (let i = 0; i < m; i++) {
    const newArr = new Array(n).fill(false);
    visited[i] = newArr;
  }

  const isInRange = (x, y) => {
    return !(x < 0 || y < 0 || x >= m || y >= n);
  };

  const bfs = (x, y) => {
    const target = board[x][y];

    visited[x][y] = true;
    let queue = [[x, y]];
    let num = 1;

    while (queue.length > 0) {
      const [currentX, currentY] = queue.shift();

      for (let k = 0; k < 4; k++) {
        const nextX = currentX + nextRow[k];
        const nextY = currentY + nextCol[k];

        if (isInRange(nextX, nextY)) {
          if (board[nextX][nextY] === target && !visited[nextX][nextY]) {
            visited[nextX][nextY] = true;
            queue.push([nextX, nextY]);
            num++;
          }
        }
      }
    }

    return num;
  };

  // Search for White
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && board[i][j] === 'W') {
        const num = bfs(i, j);
        white += Math.pow(num, 2);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      visited[i][j] = false;
    }
  }

  // Search for Blue
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && board[i][j] === 'B') {
        const num = bfs(i, j);
        blue += Math.pow(num, 2);
      }
    }
  }

  console.log(white, blue);

  process.exit();
});
