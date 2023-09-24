// test for local
const fs = require("fs"); // DELETE WHEN SUBMIT
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
  for (group of input) {
    const a = group[0];
    const b = group[1];
    console.log(a + b);
  }

  process.exit();
});
