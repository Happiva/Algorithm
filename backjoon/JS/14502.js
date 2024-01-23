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
  const [n, m] = input.shift();
  const board = input;
  let max = -Infinity;

  const copyArray = (origin) => {
    const newArr = [];
    for (let k = 0; k < origin.length; k++) {
      newArr.push(origin[k].slice());
    }
    return newArr;
  };

  const isInRange = (x, y) => {
    return x >= 0 && y >= 0 && x < n && y < m;
  };

  const spreadVirusAndCheckSafe = (curBoard) => {
    let safeCount = 0;

    const visited = new Array(n);
    for (let i = 0; i < visited.length; i++) {
      visited[i] = new Array(m).fill(false);
    }

    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        if (!visited[x][y] && curBoard[x][y] === 2) {
          let queue = [[x, y]];
          visited[x][y] = true;

          while (queue.length > 0) {
            const [currentX, currentY] = queue.shift();

            for (let c = 0; c < 4; c++) {
              const nextX = currentX + nextCol[c];
              const nextY = currentY + nextRow[c];

              if (isInRange(nextX, nextY) && curBoard[nextX][nextY] === 0) {
                queue.push([nextX, nextY]);
                visited[nextX][nextY] = true;
                curBoard[nextX][nextY] = 2;
              }
            }
          }
        }
      }
    }

    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        if (curBoard[x][y] === 0) safeCount++;
      }
    }
    
    return safeCount;
  };

  const setWall = (num) => {
    if (num === 3) {
      const newArr = copyArray(board);
      const safeCount = spreadVirusAndCheckSafe(newArr);

      max = Math.max(safeCount, max);
      return;
    } else {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (board[i][j] === 0) {
            board[i][j] = 1;
            setWall(num + 1);
            board[i][j] = 0;
          }
        }
      }
    }
  };

  setWall(0);

  console.log(max);

  process.exit();
});
