const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  let max = 0;

  const obj = {};

  for (let i = 0; i < n; i++) {
    obj[input[i]] = obj[input[i]] == null ? 1 : obj[input[i]] + 1;
    max = Math.max(obj[input[i]], max);
  }

  let answer = Object.keys(obj).filter((el) => obj[el] === max);

  answer.sort((a, b) => a < b ? -1 : 1);

  console.log(answer[0]);

  process.exit();
});
