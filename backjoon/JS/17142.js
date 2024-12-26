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
  let answer = Infinity;
  const viruses = [];
  let emptySpaces = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 2) {
        viruses.push([i, j, 0]);
      }
      if (board[i][j] === 0) {
        emptySpaces++;
      }
    }
  }

  const getCombination = (arr, last) => {
    if (arr.length === m) {
      bfs(arr);
      return;
    }

    for (let idx = last + 1; idx < viruses.length; idx++) {
      getCombination([...arr, viruses[idx]], idx);
    }
  };

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  };

  const bfs = (activated) => {
    const queue = [...activated];
    let filled = 0, totalTime = 0;
    const visited = Array.from(Array(n), () => Array(n).fill(0));

    while (queue.length) {
      const [currentX, currentY, time] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = currentX + next[d];
        const nextY = currentY + next[(d + 1) % 4];

        if (isInRange(nextX, nextY) && visited[nextX][nextY] === 0) {
          if (board[nextX][nextY] === 0) {
            filled++;
            visited[nextX][nextY] = time + 1;
            queue.push([nextX, nextY, time + 1]);
            totalTime = time + 1;
          }

          if (board[nextX][nextY] === 2) {
            visited[nextX][nextY] = time + 1;
            queue.push([nextX, nextY, time + 1]);
          }
        }
      }
    }

    if (filled === emptySpaces) {
      answer = Math.min(answer, totalTime);
    }
  };

  getCombination([], -1);

  console.log(answer === Infinity ? -1 : answer);
  process.exit();
});
 