const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let board = [];
let memoization = []; // 각 칸에서 도착지점에 도달할 수 있는 경우의 가짓수

const DP = (row, col, n) => {
  if (row === n - 1 && col === n - 1) {
    return BigInt(1);
  }

  if (row >= n || col >= n) {
    return BigInt(0);
  }

  if (memoization[row][col] != null) {
    return BigInt(memoization[row][col]);
  }

  const move = board[row][col];
  if (move === 0) return BigInt(0);

  // 현재 좌표의 경우의 수 = 오른쪽으로 갔을 때의 경우 수 + 아래로 갔을 때의 경우 수
  memoization[row][col] = DP(row + move, col, n) + DP(row, col + move, n);
  return BigInt(memoization[row][col]);
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const n = input[0][0];
  for (let i = 1; i < input.length; i++) {
    board.push(input[i]);
    const arr = new Array(n);
    memoization.push(arr.fill(null));
  }

  const num = DP(0, 0, n);
  console.log(num.toString());

  process.exit();
});
