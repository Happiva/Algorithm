const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

let answer = "";

const getGreatestDenominator = (a, b) => {
  if (a === b) return a;

  let r;
  let num;
  let tempR;

  if (a < b) {
    r = b % a;
    num = a;
  } else {
    r = a % b;
    num = b;
  }
  if (r === 0) return num;

  while (r !== 0) {
    tempR = r;
    r = num % tempR;
    num = tempR;
  }
  return tempR;
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  for (let i = 1; i < input.length; i++) {
    let a = input[i][0];
    let b = input[i][1];
    if (a === 1 || b === 1) {
      answer += `${a === 1 ? b : a}\n`;
    } else {
      const greatestDenominator = getGreatestDenominator(a, b);

      if (greatestDenominator === 1) answer += `${a * b}\n`;
      else {
        const leastMultiple = (a * b) / greatestDenominator;
        answer += `${leastMultiple}\n`;
      }
    }
  }

  console.log(answer.trim());

  process.exit();
});
