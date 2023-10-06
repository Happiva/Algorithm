const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const [, m] = input[0];
  const M = parseInt(m);
  let obj = {};

  for (let i = 1; i < input.length; i++) {
    const str = input[i][0];

    if (str.length >= M) {
      obj[str] = obj[str] ? obj[str] + 1 : 1;
    }
  }

  const keys = Object.keys(obj);

  keys.sort(function (a, b) {
    if (obj[a] != obj[b]) {
      return obj[a] < obj[b] ? 1 : -1;
    }
    if (a.length !== b.length) {
      return a.length < b.length ? 1 : -1;
    }

    return a > b ? 1 : -1;
  });

  for (el of keys) answer += `${el}\n`;
  console.log(answer.trimEnd());

  process.exit();
});
