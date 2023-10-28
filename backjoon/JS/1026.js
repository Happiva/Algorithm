const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const arrA = input[1];
  const arrB = input[2];

  const sortedArrA = arrA.sort((a, b) => a - b);
  let answer = 0;

  for (let i = 0; i < input[0][0]; i++) {
    const max = Math.max(...arrB);
    arrB[arrB.indexOf(max)] = -1;
    answer += max * sortedArrA[i];
  }

  console.log(answer);

  process.exit();
});
