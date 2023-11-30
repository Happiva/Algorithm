const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  let answer = '';
  for (let i = 0; i < input.length - 1; i++) {
    const [a, b, c] = input[i].sort((a, b) => a - b);
    if (Math.pow(c, 2) === Math.pow(a, 2) + Math.pow(b, 2)) answer += 'right\n';
    else answer += 'wrong\n';
  }

  console.log(answer.trim());

  process.exit();
});
