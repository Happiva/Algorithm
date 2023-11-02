const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, x] = input[0];
  const visitor = input[1];
  const record = {};

  if (Math.max(...visitor) === 0) {
    console.log("SAD");
    process.exit();
  }

  let sum = 0;
  let max;
  for (let i = 0; i < x; i++) {
    // 초기 최대값을 구함
    sum += visitor[i];
  }

  if (x === n) {
    console.log(sum);
    console.log(1);
    process.exit();
  }

  record[sum] = 1;
  max = sum;

  // 방문자 수를 살피며 최대값을 구하고 기록함.
  for (let i = 1; i + x - 1 <= n - 1; i++) {
    sum = sum - visitor[i - 1] + visitor[i + x - 1];
    max = Math.max(sum, max);
    record[sum] = record[sum] ? record[sum] + 1 : 1;
  }

  console.log(max);
  console.log(record[max]);

  process.exit();
});
