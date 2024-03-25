const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  let sum = 0
  let max = 0;
  const arr = input[0];
  const sumArr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    sum += arr[i];
    sumArr[i] = sum;
  }

  // 1. 벌 벌 벌통
  // 벌2의 위치가 I
  for (let i = 1; i < n - 1; i++) {
    max = Math.max(
      max, (sumArr[n - 1] - arr[0] - arr[i]) + (sumArr[n - 1] - sumArr[i])
    );
  }

  // 2. 벌 벌통 벌 / 벌통이 i
  for (let i = 1; i < n - 1; i++) {
    max = Math.max(max, (sumArr[i] - arr[0]) + (sumArr[n - 2] - sumArr[i - 1]));
  }

  // 3. 벌통 벌 벌 / 벌1의위치i
  for (let i = 1; i < n - 1; i++) {
    max = Math.max(max, sumArr[i - 1] + sumArr[n - 2] - arr[i]);
  }  

  console.log(max);
  process.exit();
});
