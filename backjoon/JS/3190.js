const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

// 0: 북, 1: 동, 2: 남, 3: 서
const next = [-1, 0, 1, 0];

const check = (arr) => {
  let test = '';
  arr.forEach((a) => test += a.join(' ') + '\n');
  console.log(test);
};

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const [n] = input.shift().map((el) => parseInt(el));
  const [k] = input.shift().map((el) => parseInt(el));
  const board = Array.from(Array(n), () => Array(n).fill(0));
  let i, curDir = 1, time = 0;
  let head = [0, 0], tail = [0, 0];
  let snake = [[0, 0]];

  for (i = 0; i < k; i++) {
    const [row, col] = input[i].map((el) => parseInt(el));
    board[row - 1][col - 1] = 1;
  }

  const [l] = input[i++].map((el) => parseInt(el));
  board[0][0] = 2; // 뱀이 있는 곳(2)
  
  // 방향 변환 정보
  let obj = {};
  for (; i < input.length; i++) {
    const [time, direction] = input[i];
    obj[time] = direction;
  }

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < n;
  };

  while (true) {
    time++;
    const nextHeadX = head[0] + next[curDir];
    const nextHeadY = head[1] + next[(curDir + 1) % 4];

    // 벽에 부딪혔거나 자기자신한테 부딪힘
    if (!isInRange(nextHeadX, nextHeadY) || board[nextHeadX][nextHeadY] === 2) {
      break;
    } else if (board[nextHeadX][nextHeadY] === 1) {
      // 사과가 있다면 머리만 추가됨
      head = [nextHeadX, nextHeadY];
      snake.unshift(head);
      board[nextHeadX][nextHeadY] = 2;
    } else {
      // 어느 것도 아니면 머리 꼬리 이동
      head = [nextHeadX, nextHeadY];
      snake.unshift(head);
      board[nextHeadX][nextHeadY] = 2;
      const [prevTailX, prevTailY] = snake.pop();
      board[prevTailX][prevTailY] = 0;
      tail = [...snake[snake.length - 1]];
    }

    if (obj[time]) {
      // 왼쪽으로 회전
      if (obj[time] === 'L') {
        curDir = (curDir - 1 < 0) ? 3 : curDir - 1
      } else { // 오른쪽 회전
        curDir = (curDir + 1) % 4;
      }
    }
  }

  console.log(time);
  process.exit();
});
