const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let arr = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const obj = {};

  for (let i = 0; i < input[1].length; i++) {
    obj[input[1][i]] = obj[input[1][i]] ? obj[input[1][i]] + 1 : 1;
  }

  for (let j = 0; j < input[3].length; j++) {
    if (obj[input[3][j]] != null) arr.push(obj[input[3][j]]);
    else arr.push(0);
  }

  console.log(arr.join(" "));

  process.exit();
});
