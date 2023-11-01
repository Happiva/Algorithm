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
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [a, b] = input;
  const gcd = getGCD(a, b);
  console.log(gcd);
  console.log((a * b) / gcd);
  process.exit();
});
