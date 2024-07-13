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
  const board = input.map((str) => str.split(''));
  let remainedSheep = 0, remainedWolf = 0;

  const visited = Array.from(Array(r), () => Array(c).fill(false));

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < r && y < c;
  };

  const startBfs = (startX, startY) => {
    const queue = [[startX, startY]];
    visited[startX][startY] = true;
    let sheep = 0, wolf = 0;

    while (queue.length) {
      const [currentX, currentY] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = currentX + next[d];
        const nextY = currentY + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY) &&
          board[nextX][nextY] !== "#" &&
          !visited[nextX][nextY]
        ) {
          visited[nextX][nextY] = true;
          queue.push([nextX, nextY]);

          if (board[nextX][nextY] === 'v') wolf++;
          if (board[nextX][nextY] === "k") sheep++;
        }
      }
    }

    if (sheep > wolf) remainedSheep += sheep;
    else remainedWolf += wolf;
  };
  
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (!visited[i][j]) {
        startBfs(i, j);
      }
    }
  }

  console.log(remainedSheep, remainedWolf);
  process.exit();
});
