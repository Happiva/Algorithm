// test for local
const fs = require("fs"); //  WHEN SUBMIT
const path = "./input.txt"; // DELETE WHEN SUBMIT

const readline = require("readline");
const rl = readline.createInterface({
  input: fs.createReadStream(path), // CHANGE TO process.stdin
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [d, n] = input.shift();

  const ovenDepth = input.shift();
  const dough = input.shift();

  let max = ovenDepth[0];
  for (let i = 1; i < d; i++) {
    if (ovenDepth[i] < max) max = ovenDepth[i];
    if (ovenDepth[i] > max) {
      ovenDepth[i] = max;
    }
  }

  let idx = 0;
  let num = 0;
  let answer;
  for (let i = d - 1; i >= 0; i--) {
    if (ovenDepth[i] >= dough[idx]) {
      num++;
      idx++;
      answer = i + 1;
    }
  }

  if (num !== n) {
    console.log(0);
  } else {
    console.log(answer);
  }

  process.exit();
});
