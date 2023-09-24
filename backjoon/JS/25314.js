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
  input = parseInt(line);
}).on("close", function () {
  const repeat = input / 4;
  let answer = "";
  for (let i = 0; i < repeat; i++) {
    answer = answer + "long ";
  }
  answer += "int";
  console.log(answer);

  process.exit();
});
