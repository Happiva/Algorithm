const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  const recursiveFibonacci = (num) => {
    if (num == 0) return 0;
    if (num == 1) return 1;

    return recursiveFibonacci(num - 1) + recursiveFibonacci(num - 2);
  };

  const answer = recursiveFibonacci(input);

  console.log(answer);
  process.exit();
});
