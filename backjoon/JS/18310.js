const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const arr = input.slice(1);
  const sortedArr = arr[0].sort((a, b) => a - b);
  const mid = Math.floor((sortedArr.length - 1) / 2);

  console.log(sortedArr[mid]);

  process.exit();
});
