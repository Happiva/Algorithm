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
  const numOfBox = input[0][0];
  let array = Array(numOfBox);

  for (let i = 0; i < numOfBox; i++) {
    array[i] = i + 1;
  }

  for (let j = 1; j < input.length; j++) {
    const boxNum1 = input[j][0];
    const boxNum2 = input[j][1];

    let temp = array[boxNum1 - 1];
    array[boxNum1 - 1] = array[boxNum2 - 1];
    array[boxNum2 - 1] = temp;
  }

  console.log(array.join(" "));

  process.exit();
});
