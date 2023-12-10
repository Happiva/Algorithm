const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const isAlphabet = (char) => {
  return 'A' <= char && 'Z' >= char;
};

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const expression = input.shift();

  const output = [];
  let num, i, calculation;
  let numStartIdx = -1;

  for (i = 0; i < expression.length; i++) {
    if (isAlphabet(expression[i])) {
      num = BigInt(parseInt(expression.slice(0, i)));
      break;
    }
  }

  for (let j = i; j < expression.length; j++) {
    if (expression[j] === 'C') {
      output.push(num.toString());
      continue;
    }

    if (isAlphabet(expression[j])) {
      // 연산 기호 등장 => 연산 기호 등록
      calculation = expression[j];
    } else {
      // 숫자 등장 => 숫자 파싱 + 계산
      if (numStartIdx < 0) numStartIdx = j;

      if (j + 1 < expression.length && isAlphabet(expression[j + 1])) {
        const parsedNum = parseInt(expression.slice(numStartIdx, j + 1));
        numStartIdx = -1;

        if (calculation != null) {
          if (calculation === "S") {
            num -= BigInt(parsedNum);
          }
          if (calculation === "M") {
            num *= BigInt(parsedNum);
          }
          if (calculation === "P") {
            num += BigInt(parsedNum);
          }
          if (calculation === "U") {
            num = BigInt(parseInt(num / BigInt(Math.abs(parsedNum))));
            if (parsedNum < 0) num *= BigInt(-1);
          }
        }
        calculation = null;
      }
    }
  }

  console.log(output.length === 0 ? 'NO OUTPUT' : output.join(' '));

  process.exit();
});
