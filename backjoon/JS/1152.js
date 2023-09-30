const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line;
}).on("close", function () {
  const trimmedStr = input.trim().split(" ");
  const filteredStr = trimmedStr.filter((el) => el !== "");
  console.log(filteredStr.length);

  process.exit();
});
