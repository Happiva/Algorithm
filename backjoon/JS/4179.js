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

  isEmpty () {
    return this.front === this.rear;
  }

  pop () {
    const popped = this.queue[this.front];
    this.front++;
    return popped;
  }
}

const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [r, c] = input.shift().split(' ').map((el) => parseInt(el));
  const board = input.map((row) => row.split(''));
  const fireboard = Array.from(Array(r), () => Array(c).fill(-1));

  let fireQueue = new Queue();
  let start;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < r && y < c;
  };
  
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] === 'J') {
        start = [i, j, 0];

        if (i === 0 || j === 0 || i === r - 1 || j === c - 1) {
          console.log(1);
          process.exit();
        }
      }
      if (board[i][j] === 'F') {
        fireboard[i][j] = 0;
        fireQueue.push([i, j, 0]);
      }
    }
  }

  const spreadFire = () => {
    while (!fireQueue.isEmpty()) {
      const [x, y, time] = fireQueue.pop();

      for (let d = 0; d < 4; d++) {
        const nextX = x + next[d];
        const nextY = y + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY) &&
          board[nextX][nextY] !== "#" &&
          fireboard[nextX][nextY] === -1
        ) {
          fireboard[nextX][nextY] = time + 1;
          fireQueue.push([nextX, nextY, time + 1]);
        }
      }
    }
  };

  spreadFire();
 
  let queue = new Queue();
  queue.push(start);
  let visited = Array.from(Array(r), () => Array(c).fill(false));
  visited[start[0]][start[1]] = true;
  let answer = Infinity;

  while (!queue.isEmpty()) {
    const [x, y, time] = queue.pop();

    if (x === 0 || y === 0 || x === r - 1 || y === c - 1) {
      answer = Math.min(answer, time);
    }
    for (let d = 0; d < 4; d++) {
      const nextX = x + next[d];
      const nextY = y + next[(d + 1) % 4];

      if (isInRange(nextX, nextY) && !visited[nextX][nextY]) {
        if (
          board[nextX][nextY] !== "#" &&
          board[nextX][nextY] !== "F" &&
          (fireboard[nextX][nextY] > time + 1 || fireboard[nextX][nextY] === -1)
        ) {
          queue.push([nextX, nextY, time + 1]);
          visited[nextX][nextY] = true;
        }
      }
    }
  }

  console.log(answer === Infinity ? 'IMPOSSIBLE' : answer + 1);
  process.exit();
});
