const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const getGCD = (a, b) => {
  if (a === b) return a;
  if (a === 1 || b === 1) return 1;

  if (b === 0) return a;

  return getGCD(b, a % b);
};

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const distance = [];

  for (let i = 1; i < input.length - 1; i++) {
    distance.push(input[i + 1] - input[i]);
  }

  let gcd = distance[0];

  for (let j = 1; j < distance.length; j++) {
    gcd = getGCD(gcd, distance[j]);
  }

  console.log((input[input.length - 1] - input[1]) / gcd + 1 - input[0]);
  process.exit();
});
