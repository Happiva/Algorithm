const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  const [r, c, d] = input.shift();

  const board = input;

  const visited = [];
  for (let i = 0; i < n; i++) {
    const newArr = new Array(m);
    visited.push(newArr.fill(false));
  }

  const queue = [[r, c, d]];
  visited[r][c] = true;
  let result = 1;

  const nextRow = [-1, 0, 1, 0]; // 북, 동, 남, 서
  const nextCol = [0, 1, 0, -1];

  const checkForDirtyRoom = (row, col) => {
    if (!board[row][col] && !visited[row][col]) return true;
    else return false;
  };

  let hasDirtyRoom;

  while (queue.length > 0) {
    const [curX, curY, curD] = queue.shift();

    if (!visited[curX][curY]) {
      visited[curX][curY] = true;
      result++;
    }
    hasDirtyRoom = false;

    for (let i = 0; i < 4; i++) {
      if (checkForDirtyRoom(curX + nextRow[i], curY + nextCol[i])) hasDirtyRoom = true;
    }

    if (hasDirtyRoom) {
      for (let i = 1; i <= 4; i++) {
        const direction = (curD - i) < 0 ? curD - i + 4 : curD - i;
        const x = curX + nextRow[direction];
        const y = curY + nextCol[direction];

        if (checkForDirtyRoom(x, y)) {
          result++;
          visited[x][y] = true;
          queue.push([x, y, direction]);
          break;
        }
      }
    }

    if (!hasDirtyRoom) {
      const x = curX + nextRow.at(curD - 2);
      const y = curY + nextCol.at(curD - 2);

      if (board[x][y]) break;
      else {
        queue.push([x, y, curD]);
      }
    }
  }

  console.log(result);

  process.exit();
});
