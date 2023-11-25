const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
let memoization;

const DP = (target) => {
  if (memoization[target] != null) {
    return memoization[target];
  }

  memoization[target] = DP(2) * DP(target - 2) + 2;
  for (let i = 2; i <= target - 4; i = i += 2) {
    memoization[target] += 2 * DP(i);
  }
  return memoization[target];
}

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  if (input % 2 === 1) {
    console.log(0);
    process.exit();
  }

  memoization = new Array(input + 1);
  memoization[2] = 3;
  memoization[4] = 11;

  const result = DP(input);
  console.log(result);

  process.exit();
});
