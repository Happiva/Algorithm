const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const sortedArr = input.slice(1).sort((a, b) => a - b);
  console.log(sortedArr.join("\n").trim());

  process.exit();
});
