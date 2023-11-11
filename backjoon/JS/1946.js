const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer =  [];

const check = (scoreArr) => {
  let y = scoreArr[0][1];

  let num = 1;

  for (let i = 1; i < scoreArr.length; i++) {
    if (scoreArr[i][1] > y) continue;
    num++;
    y = scoreArr[i][1];
  }
  answer.push(num);
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const testcase = input.shift();

  for (let i = 0; i < testcase; i++) {
    const num = input[0][0] + 1;
    const scoreArr = input.slice(1, num);
    input = input.slice(num);

    check(scoreArr.sort((a, b) => a[0] - b[0]));
  }
  console.log(answer.join('\n'));
  process.exit();
});
