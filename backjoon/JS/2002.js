const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  let answer = 0;
  const enteredArr = input.splice(0, n);
  const outArr = input;

  for (let i = 0; i < enteredArr.length; i++) {
    if (enteredArr[i] !== outArr[i]) {
      enteredArr.splice(enteredArr.indexOf(outArr[i]), 1);
      outArr.splice(i, 1);

      i--;
      answer++;
    }
  }

  console.log(answer);

  process.exit();
});
