const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let stairs;
let n;
let memoization;

const DP = (target) => {
  // memoization에 각 시점에서의 최대값을 저장하는 것이 목표
  if (target < 0) return 0;
  if (target === 0) {
    memoization[0] = stairs[0];
    return memoization[0];
  }

  if (target === 1) {
    memoization[1] = stairs[0] + stairs[1];
    return memoization[1];
  }

  if (memoization[target] != -1) {
    return memoization[target];
  }
  const temp1 = DP(target - 2);
  const temp2 = DP(target - 3) + stairs[target - 1];

  memoization[target] = Math.max(temp1, temp2) + stairs[target];

  return memoization[target];
};

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  n = input[0];
  stairs = input.slice(1);
  memoization = new Array(n);
  memoization.fill(-1);

  DP(n - 1);

  console.log(memoization[n - 1]);

  process.exit();
});
