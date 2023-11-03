const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input[0];
  const tempArr = input[1];
  let sum = 0;
  if (n === k) {
    for (el of tempArr) {
      sum += el;
    }
    console.log(sum);
    process.exit();
  }
  sum = 0;
  let max;
  for (let i = 0; i < k; i++) {
    sum += tempArr[i];
  }
  max = sum;

  for (let i = 1; i + k - 1 < n; i++) {
    sum = sum - tempArr[i - 1] + tempArr[i + k - 1];
    max = Math.max(sum, max);
  }
  console.log(max);

  process.exit();
});
