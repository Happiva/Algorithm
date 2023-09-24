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
  const numToFind = input[2][0];

  let count = 0;

  for (num of array) {
    if (numToFind === num) count++;
  }
  console.log(count);

  process.exit();
});
