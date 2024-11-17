const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const nextX = [0, 0, 0, -1, 1];
const nextY = [0, 1, -1, 0, 0];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input.shift();
  const board = input.splice(0, n);
  let answer = 0;
  let isOver = false;

  const currentBoard = Array.from(Array(n), () =>
    Array.from(Array(n), () => [])
  );

  const location = input.map((el) => {
    const [x, y, direction] = el;
    return [x - 1, y - 1, direction];
  });

  // 현재 보드 초깃값으로 초기화
  for (let num = 0; num < k; num++) {
    const [currentX, currentY] = location[num];

    currentBoard[currentX][currentY].push(num);
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  };

  while (answer <= 1000 && !isOver) {
    for (let i = 0; i < k; i++) {
      const [curX, curY, direction] = location[i];

      const nX = curX + nextX[direction];
      const nY = curY + nextY[direction];

      if (!isInRange(nX, nY) || board[nX][nY] === 2) {
        const newDirection =
          direction % 2 === 1 ? direction + 1 : direction - 1;
        const nX2 = curX + nextX[newDirection];
        const nY2 = curY + nextY[newDirection];

        location[i][2] = newDirection;

        if (isInRange(nX2, nY2) && board[nX2][nY2] !== 2) {
          const curIdx = currentBoard[curX][curY].findIndex((el) => el === i);
          const arrToMove = currentBoard[curX][curY].splice(curIdx);

          if (board[nX2][nY2] === 0) {
            // 흰색
            currentBoard[nX2][nY2].push(...arrToMove);
          } else {
            // 빨간색
            arrToMove.reverse();
            currentBoard[nX2][nY2].push(...arrToMove);
          }

          for (let idx = 0; idx < arrToMove.length; idx++) {
            location[arrToMove[idx]][0] = nX2;
            location[arrToMove[idx]][1] = nY2;
          }
          if (currentBoard[nX2][nY2].length >= 4) isOver = true;
        }
      } else if (board[nX][nY] === 0) {
        const curIdx = currentBoard[curX][curY].findIndex((el) => el === i);
        const arrToMove = currentBoard[curX][curY].splice(curIdx);
        currentBoard[nX][nY].push(...arrToMove);

        for (let idx = 0; idx < arrToMove.length; idx++) {
          location[arrToMove[idx]][0] = nX;
          location[arrToMove[idx]][1] = nY;
        }

        if (currentBoard[nX][nY].length >= 4) isOver = true;
      } else if (board[nX][nY] === 1) {
        const curIdx = currentBoard[curX][curY].findIndex((el) => el === i);
        const arrToMove = currentBoard[curX][curY].splice(curIdx);
        arrToMove.reverse();
        currentBoard[nX][nY].push(...arrToMove);

        for (let idx = 0; idx < arrToMove.length; idx++) {
          location[arrToMove[idx]][0] = nX;
          location[arrToMove[idx]][1] = nY;
        }

        if (currentBoard[nX][nY].length >= 4) isOver = true;
      }
    }

    answer++;
  }

  if (answer > 1000) {
    console.log(-1);
  } else console.log(answer);

  process.exit();
});
