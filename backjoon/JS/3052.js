const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  let obj = {};

  for (element of input) {
    const value = element % 42;
    obj[value] = 1;
  }

  const result = Object.keys(obj);
  console.log(result.length);

  process.exit();
});
