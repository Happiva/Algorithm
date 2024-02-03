const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [-1, 0, 1, 0];
const nextRow = [0, 1, 0, -1];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(" ").map((el) => parseInt(el));
  const board = input.map((str) => str.split(''));
  let coin = [];
  let answer = 11;
  // 움직여야 하는 코인이 2개. 같은 곳을 여러번 방문하더라도 방문할 때마다 두 코인의 위치가 다를 것이므로 방문 여부를 확인할 필요 X.
  // 단, 방문 여부를 확인하지 않기 때문에 재귀의 중단점이 없어짐.
  // 문제 조건 상 이동횟수가 10번이 넘어가면 안되므로, 횟수가 이미 10번이 넘은 재귀는 실행할 필요가 없으므로 return함.

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 'o') {
        coin.push(i, j);
      }
    }
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };

  const dfs = (x1, y1, x2, y2, num) => {
    if (num > 10) return;

    for (let i = 0; i < 4; i++) {
      const nextX1 = x1 + nextCol[i];
      const nextX2 = x2 + nextCol[i];
      const nextY1 = y1 + nextRow[i];
      const nextY2 = y2 + nextRow[i];

      if (isInRange(nextX1, nextY1) && isInRange(nextX2, nextY2)) {
        if (board[nextX1][nextY1] === "#" && board[nextX2][nextY2] !== "#") {
          dfs(x1, y1, nextX2, nextY2, num + 1);
        } else if (
          board[nextX1][nextY1] !== "#" &&
          board[nextX2][nextY2] === "#"
        ) {
          dfs(nextX1, nextY1, x2, y2, num + 1);
        } else if (board[nextX1][nextY1] !== "#" && board[nextX2][nextY2] !== "#") {
          dfs(nextX1, nextY1, nextX2, nextY2, num + 1);
        }
      } else if (isInRange(nextX1, nextY1) || isInRange(nextX2, nextY2)) {
        answer = Math.min(answer, num + 1);
      }
    }
  };
  
  dfs(...coin, 0);

  if (answer > 10) console.log(-1);
  else console.log(answer);

  process.exit();
});
