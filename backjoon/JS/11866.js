const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const n = input[0];
  const k = input[1];

  let checked = 0;

  let array = new Array(n);
  array.fill(0);
  let index = 0;
  let i = 0;
  let answer = [];

  while (checked !== n) {
    if (i === k - 1 && array[index] !== 1) {
      i = 0;
      array[index] = 1;
      answer.push(index + 1);
      checked++;
    } else {
      if (array[index] !== 1) {
        i++;
      }
    }
    if (index === n - 1) index = 0;
    else index++;
  }
  console.log(`<${answer.join(", ").trim()}>`);

  process.exit();
});
