const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const num = input[0];
  const currentScore = input[1];
  let maxScore = -Infinity;
  let newAverage = 0;

  for (el of currentScore) {
    if (maxScore < el) maxScore = el;
  }

  for (index in currentScore) {
    let newScore = (currentScore[index] / maxScore) * 100;
    newAverage += newScore;
  }

  console.log(newAverage / num);
});
