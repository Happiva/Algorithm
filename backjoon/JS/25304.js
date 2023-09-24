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
  const totalInReceipt = input[0][0];

  let total = 0;

  for (let i = 2; i < input.length; i++) {
    const cost = input[i][0];
    const amount = input[i][1];
    total += cost * amount;
  }

  if (total === totalInReceipt) console.log("Yes");
  else console.log("No");

  process.exit();
});
