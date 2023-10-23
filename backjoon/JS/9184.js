const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";
const memoization = new Array(51);
for (let i = 0; i < memoization.length; i++) {
  memoization[i] = new Array(51);

  for (let j = 0; j < memoization[i].length; j++)
    memoization[i][j] = new Array(51);
}

const dp = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  }
  if (a > 20 || b > 20 || c > 20) {
    if (memoization[20][20][20] != null) {
      return memoization[20][20][20];
    } else {
      memoization[20][20][20] = dp(20, 20, 20);
      return memoization[20][20][20];
    }
  }
  if (a < b && b < c) {
    if (memoization[a][b][c] != null) {
      return memoization[a][b][c];
    } else {
      memoization[a][b][c] =
        dp(a, b, c - 1) + dp(a, b - 1, c - 1) - dp(a, b - 1, c);
      return memoization[a][b][c];
    }
  }

  if (memoization[a][b][c] != null) return memoization[a][b][c];
  else {
    memoization[a][b][c] =
      dp(a - 1, b, c) +
      dp(a - 1, b - 1, c) +
      dp(a - 1, b, c - 1) -
      dp(a - 1, b - 1, c - 1);

    return memoization[a][b][c];
  }
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  for (let i = 0; i < input.length - 1; i++) {
    const [a, b, c] = input[i];
    answer += `w(${input[i].join(", ")}) = `;
    answer += `${dp(a, b, c)}\n`;
  }

  console.log(answer.trim());

  process.exit();
});
