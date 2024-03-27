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
  const [r, c, t] = input.shift();
  let board = input;
  let dust = [], cleaner = [];
  let time = 0;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] > 0) {
        dust.push([i, j]);
      }
      if (board[i][j] === -1) cleaner.push([i, j]);
    }
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < r && y < c;
  };

  const spreadDust = () => {
    // 미세먼지를 확산시킴
    let newBoard = Array.from(Array(r), () => Array(c).fill(0));
    cleaner.forEach((arr) => {
      const [cleanerX, cleanerY] = arr;
      newBoard[cleanerX][cleanerY] = -1;
    });

    for (let d = 0; d < dust.length; d++) {
      const [x, y] = dust[d];
      const dustAmount = Math.floor(board[x][y] / 5);
      let hasSpread = 0;
      
      for (let dir = 0; dir < 4; dir++) {
        const nextX = x + next[dir];
        const nextY = y + next[(dir + 1) % 4];

        if (isInRange(nextX, nextY) && board[nextX][nextY] !== -1) {
          hasSpread++;
          newBoard[nextX][nextY] += dustAmount;
        }
      }
      newBoard[x][y] += (board[x][y] - dustAmount * hasSpread);
    }
    board = newBoard;
  };

  const circulateTop = () => {
    // 윗 공기청정기 바람 순환시킴.
    const [cx] = cleaner[0];
    let before = board[cx][c - 1];
    board[cx] = [-1, 0, ...board[cx].slice(1, c - 1)];
    for (let row = cx - 1; row >= 0; row--) {
      let temp;
      temp = board[row][c - 1];
      board[row][c - 1] = before;
      before = temp;
    }
    let popped = board[0][0];
    board[0] = [...board[0].slice(1, c - 1), before, board[0][c - 1]];
    before = popped;

    for (let row = 1; row < cx; row++) {
      let temp;
      temp = board[row][0];
      board[row][0] = before;
      before = temp;
    }
  };

  const circulateBottom = () => {
    // 아래 공기청정기 바람 순환시킴.
    const [cx] = cleaner[1];
    let before = board[cx][c - 1];
    board[cx] = [-1, 0, ...board[cx].slice(1, c - 1)];
    for (let row = cx + 1; row < r; row++) {
      let temp;
      temp = board[row][c - 1];
      board[row][c - 1] = before;
      before = temp;
    }
    let popped = board[r - 1][0];
    board[r - 1] = [...board[r - 1].slice(1, c - 1), before, board[r - 1][c - 1]];
    before = popped;

    for (let row = r - 2; row > cx; row--) {
      let temp;
      temp = board[row][0];
      board[row][0] = before;
      before = temp;
    }
  };

  const updateDust = () => {
    let newDust = [];
    board.forEach((arr, x) => {
      arr.forEach((el, y) => {
        if (board[x][y] > 0) newDust.push([x, y]);
      });
    });

    dust = newDust;
  };

  const calculate = () => {
    let sum = 0;
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (board[i][j] > 0) sum += board[i][j];
      }
    }
    return sum;
  };

  while (time < t) {
    spreadDust();
    circulateTop();
    circulateBottom();
    updateDust();

    time++;
  }

  console.log(calculate());
  process.exit();
});
