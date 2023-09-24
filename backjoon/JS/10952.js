const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  for (element of input) {
    const a = element[0];
    const b = element[1];

    if (a === 0 && b === 0) return;
    console.log(a + b);
  }
  process.exit();
});
