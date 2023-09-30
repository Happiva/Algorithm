const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const scoreObj = {
    "A+": 4.5,
    A0: 4.0,
    "B+": 3.5,
    B0: 3.0,
    "C+": 2.5,
    C0: 2.0,
    "D+": 1.5,
    D0: 1.0,
    F: 0.0,
  };

  let totalCredit = 0;
  let totalScore = 0;

  for (let i = 0; i < input.length; i++) {
    const score = input[i][2];
    if (!(score === "P")) {
      const credit = input[i][1];
      totalCredit += parseInt(credit);
      totalScore += scoreObj[score] * parseInt(credit);
    }
  }

  if (totalScore === 0 && totalCredit === 0) {
    console.log(0);
  } else {
    console.log(totalScore / totalCredit);
  }

  process.exit();
});
