const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const testCase = input.shift();
  const answer = [];
  const max = Math.max(...input);

  const dpArr = Array.from(Array(max + 1), () => Array(10).fill(0));
  for (let i = 0; i < 10; i++) {
    dpArr[1][i] = 1;
  }

  for (let j = 2; j < max + 1; j++) {
    dpArr[j][0] = dpArr[j - 1][7] % 1234567;
    dpArr[j][1] = (dpArr[j - 1][2] + dpArr[j - 1][4]) % 1234567;
    dpArr[j][2] =
      (dpArr[j - 1][1] + dpArr[j - 1][3] + dpArr[j - 1][5]) % 1234567;
    dpArr[j][3] = (dpArr[j - 1][2] + dpArr[j - 1][6]) % 1234567;
    dpArr[j][4] =
      (dpArr[j - 1][1] + dpArr[j - 1][5] + dpArr[j - 1][7]) % 1234567;
    dpArr[j][5] =
      (dpArr[j - 1][2] + dpArr[j - 1][4] + dpArr[j - 1][6] + dpArr[j - 1][8]) %
      1234567;
    dpArr[j][6] =
      (dpArr[j - 1][3] + dpArr[j - 1][5] + dpArr[j - 1][9]) % 1234567;
    dpArr[j][7] =
      (dpArr[j - 1][4] + dpArr[j - 1][8] + dpArr[j - 1][0]) % 1234567;
    dpArr[j][8] =
      (dpArr[j - 1][7] + dpArr[j - 1][5] + dpArr[j - 1][9]) % 1234567;
    dpArr[j][9] = (dpArr[j - 1][6] + dpArr[j - 1][8]) % 1234567;
  }

  for (let i = 0; i < testCase; i++) {
    let sum = 0;
    dpArr[input[i]].forEach((el) => sum += el);
    answer.push(sum % 1234567);
  }

  console.log(answer.join('\n'));
  process.exit();
});
