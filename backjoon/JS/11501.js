const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = [];

const calculateMax = (stockArr) => {
  let sum = 0;
  let max = stockArr.pop();
  for (let i = stockArr.length - 1; i >= 0; i--) {
    if (stockArr[i] <= max) {
      sum += max - stockArr[i];
    } else {
      max = stockArr[i];
    }
  }
  answer.push(sum);
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const t = input[0][0];

  for (let i = 1; i <= t; i++) {
    const stockArr = input[i * 2];
    calculateMax(stockArr);
  }
  console.log('answer\n', answer.join('\n').trim());
  process.exit();
});
