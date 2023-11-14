const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const board = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input[0].split(" ").map((el) => parseInt(el));
  input.slice(1).forEach((str) => {
    board.push(str.split("").map((el) => parseInt(el)));
  });
  const visited = new Array(n);
  for (let i = 0; i < visited.length; i++) {
    const newArr = new Array(m);
    visited[i] = newArr.fill(0);
  }

  let queue = [[0, 0]];
  visited[0][0] = 1;

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    if (row + 1 < n && board[row + 1][col] === 1) {
      if (!visited[row + 1][col]) {
        visited[row + 1][col] = visited[row][col] + 1;
        queue.push([row + 1, col]);
      }
    }

    if (col + 1 < m && board[row][col + 1] === 1) {
      if (!visited[row][col + 1]) {
        visited[row][col + 1] = visited[row][col] + 1;
        queue.push([row, col + 1]);
      }
    }

    if (col - 1 >= 0 && board[row][col - 1] === 1) {
      if (!visited[row][col - 1]) {
        visited[row][col - 1] = visited[row][col] + 1;
        queue.push([row, col - 1]);
      }
    }

    if (row - 1 >= 0 && board[row - 1][col] === 1) {
      if (!visited[row - 1][col]) {
        visited[row - 1][col] = visited[row][col] + 1;
        queue.push([row - 1, col]);
      }
    }
  }
  
  console.log(visited[n - 1][m - 1]);

  process.exit();
});
