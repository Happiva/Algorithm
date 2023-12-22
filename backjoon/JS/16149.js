const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift(); // n개를 사기 위한 최소 금액
  const memoization = [0, ...input.shift()];
  // n개의 최소금액 -> 바로 n개가 든 카드팩 사거나 or 아래애들의 최솟값을 조합하거나
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      memoization[i] = Math.min(memoization[i], memoization[j] + memoization[i - j]);
    }
  }

  console.log(memoization[n]);
  
  process.exit();
});
