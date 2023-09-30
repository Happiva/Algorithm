const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ");
}).on("close", function () {
  const reversedArr = input.map((el) => el.split("").reverse().join(""));
  const num1 = parseInt(reversedArr[0]);
  const num2 = parseInt(reversedArr[1]);

  if (num1 > num2) console.log(num1);
  else console.log(num2);
});
