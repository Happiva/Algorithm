const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = [];
let num = 0;
let sum = 0;

const memoization = [];

const DF = (target) => {
  if (sum === target) {
    num++;
    return;
  }
  if (target - sum >= 1) {
    sum += 1;
    memoization.push(sum);
    DF(target);
    memoization.pop();
    sum -= 1;
  }
  if (target - sum >= 2) {
    sum += 2;
    memoization.push(sum);
    DF(target);
    memoization.pop();
    sum -= 2;
  }
  if (target - sum >= 3) {
    sum += 3;
    memoization.push(sum);
    DF(target);
    memoization.pop();
    sum -= 3;
  }
};

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  for (let i = 1; i < input.length; i++) {
    // Here we go DP!
    num = 0;
    sum = 0;
    DF(input[i]);
    answer.push(num);
  }
  console.log(answer.join("\n"));
  process.exit();
});
