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
  let board = input;
  let answer = 0;

  let totalCheese = board.reduce((acc, cur) => {
    acc += cur.filter(el => el === 1).length;
    return acc;
  }, 0);

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  }

  if (totalCheese === 0) {
    console.log(0);
    process.exit();
  }

  const bfs = (x, y, visitedArr, target) => {
    const queue = [[x, y]];
    visitedArr[x][y] = true;
    board[x][y] = target;
    
    while (queue.length) {
      const [curX, curY] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = curX + next[d];
        const nextY = curY + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY) &&
          !visitedArr[nextX][nextY] &&
          board[nextX][nextY] !== 1
        ) {
          visitedArr[nextX][nextY] = true;
          board[nextX][nextY] = target;
          queue.push([nextX, nextY]);
        }
      }
    }
  };

  while (totalCheese > 0) {
    const visited = Array.from(Array(n), () => Array(m).fill(false));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const target = (i === 0 && j === 0) ? 0 : 2;
        if (!visited[i][j] && board[i][j] !== 1) {
          bfs(i, j, visited, target);
        }
      }
    }

    const newBoard = board.map(arr => [...arr]);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] !== 1) continue;

        let outside = 0;
        for (let d = 0; d < 4; d++) {
          const nextX = i + next[d];
          const nextY = j + next[(d + 1) % 4];

          if (isInRange(nextX, nextY) && board[nextX][nextY] === 0) outside++;
        }

        if (outside >= 2) {
          totalCheese--;
          newBoard[i][j] = 0;
        }
      }
    }
    board = newBoard;
    answer++;
  }

  console.log(answer);
  
  process.exit();
});
