const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split("").map((el) => parseInt(el));
}).on("close", function () {
  const sortedArr = input.sort((a, b) => b - a);
  console.log(sortedArr.join(""));
  process.exit();
});
