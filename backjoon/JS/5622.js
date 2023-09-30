const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line;
}).on("close", function () {
  const A = "A".charCodeAt(0);
  const timeForChar = [
    3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10, 10,
    10, 10,
  ];

  const numberArr = input.split("");
  let sum = 0;

  for (let i = 0; i < numberArr.length; i++) {
    const asciiNum = numberArr[i].charCodeAt(0) - A;

    sum += timeForChar[asciiNum];
  }

  console.log(sum);

  process.exit();
});
