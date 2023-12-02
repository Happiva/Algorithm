const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const [n, m] = input.shift().map((el) => parseInt(el));
  const obj = {};

  for (let i = 0; i < n; i++) {
    const [url, pw] = input[i];
    obj[url] = pw;
  }
  
  let answer = '';

  for (let i = n; i < input.length; i++) {
    answer += obj[input[i][0]] + '\n';
  }
  console.log(answer.trim());

  process.exit();
});
