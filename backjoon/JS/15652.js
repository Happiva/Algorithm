const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let answer = "";
const str = [];

const backTrack = (num) => {
  if (num === m) {
    answer += `${str.join(" ")}\n`;
  } else {
    const before = str[str.length - 1] ?? 1;

    for (let i = 1; i <= n; i++) {
      if (before <= i) {
        str.push(i);

        backTrack(num + 1);

        str.pop();
      }
    }
  }
};

rl.on("line", (line) => {
  [n, m] = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  backTrack(0);

  console.log(answer.trim());

  process.exit();
});
