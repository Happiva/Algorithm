const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const array = input[1];
  let min = Infinity;
  let max = -Infinity;

  for (element of array) {
    if (min > element) min = element;
    if (max < element) max = element;
  }
  console.log(min, max);

  process.exit();
});
