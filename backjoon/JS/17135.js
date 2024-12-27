const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [0, -1, 0, 1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m, d] = input.shift();
  let answer = -Infinity;
  let enemies = 0;

  const getDistance = (x1, x2, y1, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  const checkEnemies = (board) => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] === 1) sum++;
      }
    }

    return sum;
  };

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };
  
  const bfs = (startX, startY, board) => {
    const queue = [[startX, startY]];
    const visited = Array.from(Array(n), () => Array(m).fill(false));
    let minDistance = Infinity;
    let pos;

    while (queue.length) {
      const [curX, curY] = queue.shift();
      if (isInRange(curX, curY)) visited[curX][curY] = true;

      for (let dir = 0; dir < 4; dir++) {
        const nextX = curX + next[dir];
        const nextY = curY + next[(dir + 1) % 4];
        const distance = getDistance(startX, nextX, startY, nextY);
        if (
          isInRange(nextX, nextY) &&
          !visited[nextX][nextY] &&
          distance <= d
        ) {
          if (board[nextX][nextY] === 1) {
            if (minDistance > distance) {
              pos = [nextX, nextY];
              minDistance = distance;
            }
            if (minDistance === distance && pos[1] > nextY) {
              pos = [nextX, nextY];
            }
          }
          
          queue.push([nextX, nextY]);
        }
      }
    }

    return pos;
  };

  const enemyMove = (board) => {
    const newBoard = new Array(n);
    newBoard[0] = new Array(m).fill(0);

    for (let row = 0; row < n - 1; row++) {
      newBoard[row + 1] = board[row];
    }

    return newBoard;
  };

  const simulate = (selected) => {
    let remained = enemies, totalDefeated = 0;
    let board = input.map(row => [...row]);
    let defeatedArr = [];

    while (remained > 0) {
      defeatedArr = [];
      for (let s = 0; s < selected.length; s++) {
        const defeatedEnemy = bfs(...selected[s], board);

        if (defeatedEnemy != undefined) {
          defeatedArr.push(defeatedEnemy);
        }
      }
      defeatedArr.forEach(pos => {
        const [x, y] = pos;
        board[x][y] = 0;
      });

      const currentEnemies = checkEnemies(board);
      totalDefeated += remained - currentEnemies;

      if (currentEnemies === 0) {
        break;
      }
      remained = currentEnemies - board[n - 1].filter((el) => el === 1).length;
      board = enemyMove(board);
    }

    answer = Math.max(answer, totalDefeated);
  };

  const getCombination = (selected, lastIdx) => {
    if (selected.length === 3) {
      simulate(selected);
      return;
    }

    for (let idx = lastIdx + 1; idx < m; idx++) {
      getCombination([...selected, [n, idx]], idx);
    }
  };

  enemies = checkEnemies(input);

  getCombination([], -1);

  console.log(answer);
  process.exit();
});
