const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
let answer = 0;
let board;

const checkForQueen = (row, col) => {
  if (row === 0) return true;

  // Check for column
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) return false;
  }

  // Check for diagonal
  let r = row;
  if (col != input - 1) {
    let right = col;
    while (right < input && r - 1 >= 0) {
      if (board[--r][++right] === 1) return false;
    }
  }

  if (col != 0) {
    let left = col;
    r = row;
    while (left >= 0 && r - 1 >= 0) {
      if (board[--r][--left] === 1) return false;
    }
  }

  return true;
};

const backTrack = (num) => {
  if (num === input) {
    // console.log(board);
    answer++;
  } else {
    for (let i = 0; i < input; i++) {
      // 한 행에 대해 무조건 한 개의 퀸을 놓아야 함.
      // 한 행 -> for의 반복으로 해결
      // 별도의 방법으로 놓으려는 자리의 각 열과 대각선에 퀸이 있는지 확인해야 함.
      if (checkForQueen(num, i)) {
        board[num][i] = 1;
        backTrack(num + 1);
        board[num][i] = 0;
      }
    }
  }
};

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  board = new Array(input);
  for (let i = 0; i < input; i++) {
    board[i] = new Array(input);
    board[i].fill(0);
  }

  backTrack(0);

  console.log(answer);

  process.exit();
});
