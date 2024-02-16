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
  const [n] = input.shift();
  let sharkX, sharkY;
  let fishes = 0, eatten = 0, answer = 0, shark = 2;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === 9) {
        sharkX = i;
        sharkY = j;
      }
      if (input[i][j] !== 9 && input[i][j] !== 0) fishes++;
    }
  }
  input[sharkX][sharkY] = 0;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  };

  const bfs = (sharkX, sharkY) => {
    let queue = [[sharkX, sharkY, 0]];
    const visited = Array.from(Array(n), () => Array(n).fill(false));
    visited[sharkX][sharkY] = true;
    let fishInfo = [];

    while (queue.length > 0) {
      const [currentX, currentY, distance] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nextX = currentX + next[i];
        const nextY = currentY + next[(i + 1) % 4];

        if (isInRange(nextX, nextY) && !visited[nextX][nextY] && shark >= input[nextX][nextY]) {
          queue.push([nextX, nextY, distance + 1]);
          visited[nextX][nextY] = true;

          if (input[nextX][nextY] > 0 && input[nextX][nextY] < shark) {
            fishInfo.push({ distance: distance + 1, x: nextX, y: nextY });
          }
        }
      }
    }
    
    return fishInfo;
  };  

  while (fishes) {
    const eatableFishes = bfs(sharkX, sharkY);
    const sorted = eatableFishes.sort((a, b) => {
      if (a.distance === b.distance) {
        if (a.x === b.x) {
          return a.y - b.y;
        }
        return a.x - b.x;
      }
      return a.distance - b.distance;
    });

    if (sorted.length === 0) break;

    eatten++;
    fishes--;
    const { x, y, distance } = sorted[0];

    sharkX = x, sharkY = y;

    input[x][y] = 0;

    if (eatten === shark) {
      eatten = 0;
      shark++;
    }
    answer += distance;
  }
  
  console.log(answer);

  process.exit();
});
