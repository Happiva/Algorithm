const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n, m;
let answer = 0;

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  [n, m] = input[0].map((el) => parseInt(el));
  const set = new Set();

  for (let i = 1; i <= n; i++) {
    set.add(input[i][0]);
  }

  for (let j = n + 1; j < input.length; j++) {
    if (set.has(input[j][0])) answer++;
  }
  console.log(answer);

  process.exit();
});
