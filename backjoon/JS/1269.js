const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const setA = new Set(input[1]);
  const setB = new Set(input[2]);

  const differentSetA = new Set([...setA].filter((el) => !setB.has(el)));
  const differentSetB = new Set([...setB].filter((el) => !setA.has(el)));

  console.log([...differentSetA].length + [...differentSetB].length);

  process.exit();
});
