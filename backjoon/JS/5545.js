const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const [doughCost, cost] = input.shift().split(' ').map((el) => parseInt(el));
  const doughCalory = parseInt(input.shift());
  const sortedArr = input.map((el) => parseInt(el)).sort((a, b) => b - a);

  let calorySum = doughCalory;
  let costSum = doughCost;

  for (let i = 0; i < n; i++) {
    let currentCalory = calorySum + sortedArr[i];
    let currentSum = costSum + cost;

    const current = Math.floor(currentCalory / currentSum);

    if (current >= Math.floor(calorySum / costSum)) {
      calorySum = currentCalory;
      costSum = currentSum;
    } else break;
  }

  console.log(Math.floor(calorySum / costSum));
  process.exit();
});
