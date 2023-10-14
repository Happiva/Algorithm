const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const set = new Set();
  for (i of input[1]) {
    set.add(i);
  }

  for (j of input[3]) {
    if (set.has(j)) {
      answer.push(1);
    } else answer.push(0);
  }
  console.log(answer.join(" ").trim());

  process.exit();
});
