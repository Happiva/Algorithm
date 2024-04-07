const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [col, row] = input.shift();
  let hour = 0, cheeze = 0, numOfCheeze = [];
  let board = input;
  let visitedArr = Array.from(Array(col), () => Array(row).fill(false));

  board.forEach((arr) => {
    arr.forEach((el) => {
      if (el === 1) cheeze++;
    });
  });
  numOfCheeze.push(cheeze);

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < col && y < row;
  };

  const initializeArr = () => {
    for (let a = 0; a < col; a++) {
      visitedArr[a].fill(false);
    }
  };

  const initializeAir = () => {
    // 바깥쪽 공기를 2로 표기
    initializeArr();
    
    let queue = [[0, 0]];
    visitedArr[0][0] = true;
    board[0][0] = 2;

    while (queue.length) {
      const [curX, curY] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = curX + next[d];
        const nextY = curY + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY)
          && !visitedArr[nextX][nextY]
          && board[nextX][nextY] === 0
        ) {
          visitedArr[nextX][nextY] = true;
          queue.push([nextX, nextY]);
          board[nextX][nextY] = 2;
        }
      }
    }
  };

  const meltCheeze = () => {
    initializeArr();
    let newBoard = Array(col);
    for (let idx = 0; idx < col; idx++) {
      newBoard[idx] = [...board[idx]];
    }

    let queue = [[0, 0]];
    visitedArr[0][0] = true;

    while (queue.length) {
      const [curX, curY] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = curX + next[d];
        const nextY = curY + next[(d + 1) % 4];

        if (isInRange(nextX, nextY) && !visitedArr[nextX][nextY]) {
          if (board[nextX][nextY] === 1) {
            visitedArr[nextX][nextY] = true;
            newBoard[nextX][nextY] = 2;
            cheeze--;
          }

          if (board[nextX][nextY] === 2) {
            visitedArr[nextX][nextY] = true;
            queue.push([nextX, nextY]);
          }
        }
      }
    }

    // 공기 상황을 업데이트
    initializeArr();
    queue = [[0, 0]];
    visitedArr[0][0] = true;
    while (queue.length) {
      const [curX, curY] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = curX + next[d];
        const nextY = curY + next[(d + 1) % 4];

        if (isInRange(nextX, nextY) && !visitedArr[nextX][nextY]) {
          if (newBoard[nextX][nextY] === 0) {
            visitedArr[nextX][nextY] = true;
            newBoard[nextX][nextY] = 2;
          }

          if (newBoard[nextX][nextY] === 2) {
            visitedArr[nextX][nextY] = true;
            queue.push([nextX, nextY]);
          }
        }
      }
    }

    board = newBoard;
  };

  initializeAir();

  while (cheeze > 0) {
    meltCheeze();

    numOfCheeze.push(cheeze);
    hour++;
  }

  console.log(hour);
  console.log(numOfCheeze[numOfCheeze.length - 2] ?? 0);
  process.exit();
});
