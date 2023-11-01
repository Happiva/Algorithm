const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const cost = input[1];
  const target = input[0][0];
  const memoization = [0, ...cost];

  for (let i = 2; i <= target; i++) {
    for (let j = 1; j <= i; j++) {
      memoization[i] = Math.max(
        memoization[i],
        memoization[j] + memoization[i - j]
      );
    }
  }
  // console.log(memoization);
  console.log(memoization[target]);

  process.exit();
});
