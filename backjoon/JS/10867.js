const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const set = new Set(input[1]);
  const arr = [...set].sort((a, b) => a - b);
  console.log(arr.join(" ").trim());
  process.exit();
});
