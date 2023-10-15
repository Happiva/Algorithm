const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

let min = Infinity;
let max = -Infinity;
let n;
let numArr;

let usedOperator;

const recursion = (curResult, num) => {
  if (num + 1 === n) {
    if (curResult > max) max = curResult;
    if (curResult < min) min = curResult;
  } else {
    let answer;
    if (usedOperator[0] > 0) {
      // +
      answer = curResult + numArr[num + 1];
      usedOperator[0]--;
      recursion(answer, num + 1);
      usedOperator[0]++;
    }

    if (usedOperator[1] > 0) {
      // -
      answer = curResult - numArr[num + 1];
      usedOperator[1]--;
      recursion(answer, num + 1);
      usedOperator[1]++;
    }

    if (usedOperator[2] > 0) {
      // *
      answer = curResult * numArr[num + 1];
      usedOperator[2]--;
      recursion(answer, num + 1);
      usedOperator[2]++;
    }

    if (usedOperator[3] > 0) {
      // /
      if (curResult < 0) {
        answer = Math.floor(Math.abs(curResult) / numArr[num + 1]) * -1;
      } else {
        answer = Math.floor(curResult / numArr[num + 1]);
      }
      usedOperator[3]--;
      recursion(answer, num + 1);
      usedOperator[3]++;
    }
  }
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  n = input[0][0];
  numArr = input[1];
  const operatorArr = input[2];

  usedOperator = operatorArr;

  recursion(numArr[0], 0);

  if (max === -0) max = 0;
  if (min === -0) min = 0;
  console.log(max);
  console.log(min);

  process.exit();
});
