const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input
    .shift()
    .split(" ")
    .map((el) => parseInt(el));
  let answer = Infinity;

  const board = input.map((str) => str.split(""));

  let red, blue;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "R") {
        red = [i, j];
        board[i][j] = ".";
      }
      if (board[i][j] === "B") {
        blue = [i, j];
        board[i][j] = ".";
      }
    }
  }
  
  let queue = [[...blue, ...red, 0]];

  const move = (x, y, oX, oY, dir) => {
    let xPos = x, yPos = y;
    while (true) {
      const nextX = xPos + next[dir];
      const nextY = yPos + next[(dir + 1) % 4];

      if (nextX === oX && nextY === oY) {
        break;
      } else if (board[nextX][nextY] === 'O') {
        return [-1, -1];
      } else if (board[nextX][nextY] === '#') {
        break;
      } else {
        xPos = nextX;
        yPos = nextY;
      }
    }

    return [xPos, yPos];
  };

  const checkDir = (bx, by, rx, ry, dir) => {
    // red 먼저면 true, 아니면 false 반환
    if (dir === 0) return rx < bx;
    if (dir === 1) return ry > by;
    if (dir === 2) return rx > bx;
    if (dir === 3) return ry < by;
  };

  while (queue.length) {
    const [bX, bY, rX, rY, num] = queue.shift();
    let newRX, newRY, newBX, newBY;

    for (let i = 0; i < 4; i++) {
      if (checkDir(bX, bY, rX, rY, i)) {
        // red 먼저 움직여야 함
        [newRX, newRY] = move(rX, rY, bX, bY, i);
        [newBX, newBY] = move(bX, bY, newRX, newRY, i);
      } else {
        [newBX, newBY] = move(bX, bY, rX, rY, i);
        [newRX, newRY] = move(rX, rY, newBX, newBY, i);
      }

      if (bX === newBX && bY === newBY && rX === newRX && rY === newRY) {
        continue;
      }
      if (newBX === -1 && newBY === -1) continue;
      if (newRX === -1 && newRY === -1 && num + 1 <= 10) {
        answer = Math.min(answer, num + 1);
        continue;
      }
      if (num === 10) continue;
      queue.push([newBX, newBY, newRX, newRY, num + 1]);
    }
  }

  console.log(answer === Infinity ? -1 : answer);
  process.exit();
});
