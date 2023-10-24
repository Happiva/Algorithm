const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const getGreatestCommonDivisor = (a, b) => {
  if (a === b) return a;
  if (a === 1 || b === 1) return 1;

  let num;
  let r;

  if (a < b) {
    r = b % a;
    num = a;
  } else {
    r = a % b;
    num = b;
  }

  if (r === 0) return num;

  let tempR;
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
  let denominator = input[0][1] * input[1][1];
  let numerator = input[0][0] * input[1][1] + input[1][0] * input[0][1];

  const gcd = getGreatestCommonDivisor(denominator, numerator);

  console.log(numerator / gcd, denominator / gcd);

  process.exit();
});
