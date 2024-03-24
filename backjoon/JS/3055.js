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
  const [r, c] = input.shift().split(' ').map((el) => parseInt(el));
  let board = input.map((str) => str.split(''));
  let visited = Array.from(Array(r), () => Array(c).fill(false));
  let water = [];
  let queue = [];
  let answer = Infinity;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < r && y < c;
  };

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] === '*') {
        water.push([i, j]);
      }
      if (board[i][j] === 'S') {
        visited[i][j] = true;
        board[i][j] = '.';
        queue.push([i, j, 0]);
      }
    }
  }

  const moveWater = () => {
    let newWater = [];
    
    for (let w = 0; w < water.length; w++) {
      const [waterX, waterY] = water[w];
      newWater.push([waterX, waterY]);

      next.forEach((el, idx) => {
        const newWaterX = waterX + el;
        const newWaterY = waterY + next[(idx + 1) % 4];

        if (
          isInRange(newWaterX, newWaterY) &&
          board[newWaterX][newWaterY] === "."
        ) {
          newWater.push([newWaterX, newWaterY]);
          board[newWaterX][newWaterY] = "*";
        }
      });
    }
    water = newWater;
  };

  while (queue.length > 0) {
    // 1. 물을 퍼뜨림
    moveWater();
    const length = queue.length;
    let i = 0;

    // 2. 그 다음에 고슴도치를 이동시킴.
    while (i < length) {
      const [currentX, currentY, num] = queue.shift();

      if (board[currentX][currentY] === 'D') {
        answer = num;
        break;
      }

      for (let k = 0; k < 4; k++) {
        const nextX = currentX + next[k];
        const nextY = currentY + next[(k + 1) % 4];

        if (
          isInRange(nextX, nextY) &&
          !visited[nextX][nextY] &&
          (board[nextX][nextY] === "." || board[nextX][nextY] === "D")
        ) {
          visited[nextX][nextY] = true;
          queue.push([nextX, nextY, num + 1]);
        }
      }
      i++;
    }
  }

  console.log(answer === Infinity ? 'KAKTUS' : answer);
  process.exit();
});
