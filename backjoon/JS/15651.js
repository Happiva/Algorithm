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
    for (let i = 0; i < n; i++) {
      str.push(i + 1);

      backTrack(num + 1);

      str.pop();
    }
  }
};

rl.on("line", (line) => {
  [n, m] = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  backTrack(0);
  console.log(answer.trimEnd());

  process.exit();
});
