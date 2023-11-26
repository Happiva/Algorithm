const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input.shift();

  const memoization = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) {
    const newArr = new Array(k + 1);
    memoization[i] = newArr.fill(0);
  }

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < k + 1; j++) {
      const [currentItemW, currentItemV] = input[i - 1];

      if (currentItemW <= j) {
        memoization[i][j] = Math.max(memoization[i - 1][j], memoization[i - 1][j - currentItemW] + currentItemV);
      } else {
        memoization[i][j] = memoization[i - 1][j];
      }
    }
  }

  console.log(memoization[n][k]);

  process.exit();
});
