const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [size] = input.shift();

  const board = input;
  let min = Infinity;
  let max = -Infinity;

  const visited = [];
  for (let i = 0; i < size; i++) {
    const newArr = new Array(size);
    visited.push(newArr.fill(false));
  }

  let result = [];
  let queue = [];
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (min > board[i][j]) min = board[i][j];
      if (max < board[i][j]) max = board[i][j];
    }
  }

  const nextRow = [-1, 0, 1, 0];
  const nextCol = [0, 1, 0, -1];

  for (let height = min; height <= max; height++) {
    visited.map((arr) => arr.fill(false));

    let num = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] > height && !visited[i][j]) {
          queue = [[i, j]];
          visited[i][j] = true;

          while (queue.length > 0) {
            const [curX, curY] = queue.shift();

            for (let k = 0; k < 4; k++) {
              const nextX = curX + nextRow[k];
              const nextY = curY + nextCol[k];

              if (nextX < size && nextX >= 0 && nextY < size && nextY >= 0) {
                if (board[nextX][nextY] > height && !visited[nextX][nextY]) {
                  visited[nextX][nextY] = true;
                  queue.push([nextX, nextY]);
                }
              }
            }
          }
          num++;
        }
      }
    }
    result.push(num);
  }
  console.log(Math.max(...result) ? Math.max(...result) : 1);

  process.exit();
});
