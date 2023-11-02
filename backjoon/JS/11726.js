const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let memoization = new Array(1001);

const DP = (target) => {
  if (memoization[target] != null) return memoization[target];
  memoization[target] = DP(target - 2) + DP(target - 1);
  return memoization[target] % 10007;
};

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  memoization[0] = 0;
  memoization[1] = 1;
  memoization[2] = 2;

  const answer = DP(input);
  console.log(answer);
  process.exit();
});
