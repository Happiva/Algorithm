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
  input.push(line);
}).on("close", function () {
  for (let i = 0; i < input.length; i++) {
    process.stdout.write(input[i]);
    if (i < input.length - 1) {
      process.stdout.write("\n");
    }
  }

  process.exit();
});
