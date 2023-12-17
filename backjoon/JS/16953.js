const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [a, b] = input;

  let num = b;
  let answer = 1;
  while (num > a) {
    if (num % 10 === 1) {
      num = Math.floor(num / 10);
      answer++;
    } else if (num % 2 === 0) {
      num /= 2;
      answer++;
    } else break;
  }

  console.log(num === a ? answer : -1);

  process.exit();
});
