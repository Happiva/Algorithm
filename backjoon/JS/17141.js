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
  const [n, m] = input.shift();
  const board = input;
  let blank = 0, blankLocation = [], minTime = Infinity;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 0 || board[i][j] === 2) {
        blank++;

        if (board[i][j] === 2) {
          blankLocation.push([i, j]);
        }
      }
    }
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  };

  const spreadVirus = (virusQueue) => {
    const queue = [...virusQueue];
    const visited = Array.from(Array(n), () => Array(n).fill(0));

    queue.forEach((arr) => {
      const [x, y, time] = arr;
      visited[x][y] = 1;
    });

    let filled = virusQueue.length;

    while (queue.length) {
      const [currentX, currentY, time] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = currentX + next[d];
        const nextY = currentY + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY) &&
          board[nextX][nextY] !== 1 &&
          !visited[nextX][nextY]
        ) {
          visited[nextX][nextY] = time + 1;
          filled++;
          queue.push([nextX, nextY, time + 1]);
        }
      }
    }

    if (filled === blank) {
      let answer = -Infinity;

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (answer < visited[i][j]) answer = visited[i][j];
        }
      }
      minTime = Math.min(minTime, answer);
    }
  };

  const getCombination = (last, num, combinationArr) => {
    if (num === m) {
      spreadVirus(combinationArr);
      return;
    }

    for (let idx = last + 1; idx < blankLocation.length; idx++) {
      const location = blankLocation[idx];
      getCombination(idx, num + 1, [...combinationArr, [...location, 1]]);
    }
  };

  getCombination(-1, 0, []);
  
  console.log(minTime === Infinity ? -1 : minTime - 1);
  process.exit();
});
