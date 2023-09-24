const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // CHANGE TO process.stdin
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  let maxIdx = 0;
  let max = -Infinity;

  for (i in input) {
    if (max < input[i]) {
      max = input[i];
      maxIdx = parseInt(i) + 1;
    }
  }
  console.log(max);
  console.log(maxIdx);

  process.exit();
});
