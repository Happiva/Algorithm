const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const n = input[0][0];
  let array = Array(n);

  for (let i = 0; i < array.length; i++) {
    array[i] = 0;
  }

  for (let i = 1; i < input.length; i++) {
    const start = input[i][0];
    const end = input[i][1];
    const ballNum = input[i][2];
    for (let j = start - 1; j < end; j++) {
      array[j] = ballNum;
    }
  }

  console.log(array.join(" "));

  process.exit();
});
