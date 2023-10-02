const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  let num = 666;
  let i = 1;

  while (input !== i) {
    num++;

    if (num.toString().includes("666")) {
      i++;
    }
  }

  console.log(num);

  process.exit();
});
