// test for local
const fs = require("fs"); // DELETE WHEN SUBMIT
const path = "./input.txt"; // DELETE WHEN SUBMIT

const readline = require("readline");
const rl = readline.createInterface({
  input: fs.createReadStream(path), // CHANGE TO process.stdin
  output: process.stdout,
});

let n, m;
let answer = "";
const str = [];
const visited = new Array(n);
visited.fill(0);

const backTrack = (num) => {
  if (num === m) {
    answer += `${str.join(" ")}\n`;
  }

  for (let i = 0; i < n; i++) {
    const min = str[str.length - 1] ?? 0;

    if ((visited[i] === 0 || !visited[i]) && min < i + 1) {
      str.push(i + 1);
      visited[i] = 1;

      backTrack(num + 1);
      visited[i] = 0;
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
