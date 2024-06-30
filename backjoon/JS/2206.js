const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Queue {
  constructor () {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  push (el) {
    this.queue[this.rear] = el;
    this.rear++;
  }

  pop () {
    return this.queue[this.front++];
  }

  isEmpty () {
    return this.front === this.rear;
  }
}

const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(' ').map((el) => parseInt(el));
  const board = input.map((str) => str.split(''));
  const visited = Array.from(Array(n), () => Array.from(Array(m), () => Array(2).fill(false)));
  let answer = Infinity;

  const queue = new Queue();
  queue.push([0, 0, 0, 1]);
  visited[0][0] = true;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };

  while (!queue.isEmpty()) {
    const [curX, curY, isWallBroken, distance] = queue.pop();

    if (curX === n - 1 && curY === m - 1) {
      answer = Math.min(answer, distance);
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nextX = curX + next[i];
      const nextY = curY + next[(i + 1) % 4];

      if (!isInRange(nextX, nextY)) continue;
      if (!visited[nextX][nextY][isWallBroken] && board[nextX][nextY] === '0') {
        visited[nextX][nextY][isWallBroken] = true;
        queue.push([nextX, nextY, isWallBroken, distance + 1]);
      }

      if (board[nextX][nextY] === '1' && !isWallBroken) {
        visited[nextX][nextY][1] = true;
        queue.push([nextX, nextY, 1, distance + 1]);
      }
    }
  }

  console.log(answer === Infinity ? -1 : answer);
  process.exit();
});
