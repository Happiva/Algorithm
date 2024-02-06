const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  let answer = 0;
  const n = input.shift();
  if (n === 1) {
    console.log(input[0]);
    process.exit();
  }

  const sortedArr = input.sort((a, b) => a - b);
  const minusArr = sortedArr.filter((n) => 0 > n);
  const plusArr = sortedArr.filter((n) => 0 < n).sort((a, b) => b - a);
  const isZero = sortedArr.filter((n) => n === 0).length > 0;

  if (minusArr.length > 0) {
    if (minusArr.length % 2 === 0) {
      for (let i = 0; i < minusArr.length; i += 2) {
        answer += minusArr[i] * minusArr[i + 1];
      }
    } else {
      for (let i = 0; i < minusArr.length - 1; i += 2) {
        answer += minusArr[i] * minusArr[i + 1];
      }
      if (!isZero) answer += minusArr[minusArr.length - 1];
    }
  }

  if (plusArr.length > 0) {
    if (plusArr.length % 2 === 0) {
      for (let i = 0; i < plusArr.length; i += 2) {
        if (plusArr[i] === 1 || plusArr[i + 1] === 1) {
          answer += plusArr[i] + plusArr[i + 1];
        } else answer += plusArr[i] * plusArr[i + 1];
      }
    } else {
      for (let i = 0; i < plusArr.length - 1; i += 2) {
        if (plusArr[i] === 1 || plusArr[i + 1] === 1) {
          answer += plusArr[i] + plusArr[i + 1];
        } else answer += plusArr[i] * plusArr[i + 1];
      }
      answer += plusArr[plusArr.length - 1];
    }
  }

  console.log(answer);
  process.exit();
});
