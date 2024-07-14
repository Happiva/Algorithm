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
  const list = input.shift();
  let answer, leftIdx = 0, rightIdx = n - 1;
  answer = [leftIdx, rightIdx];

  while (true) {
    if (leftIdx >= rightIdx) {
      break;
    }

    const sum = list[leftIdx] + list[rightIdx];
    const currentAnswer = list[answer[0]] + list[answer[1]];

    if (Math.abs(sum) < Math.abs(currentAnswer)) {
      answer = [leftIdx, rightIdx];
    }

    if (sum > 0) rightIdx--;
    else if (sum < 0) leftIdx++;
    else break;
  }

  console.log(list[answer[0]], list[answer[1]]);
  process.exit();
});
