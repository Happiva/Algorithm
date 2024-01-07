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
  const arr = input
    .shift()
    .split(" ")
    .map((el) => parseInt(el));
  
  let answer = [n];

  for (let i = n - 2; i >= 0; i--) {
    const currentHeight = i + 1;
    const num = arr[i];

    if (num === 0) {
      answer = [currentHeight, ...answer];
    } else {
      let bigNum = 0;
      for (let j = 0; j < answer.length; j++) {
        if (answer[j] > currentHeight) bigNum++;
        if (num === bigNum) {
          answer.splice(bigNum, 0, currentHeight);
          break;
        }
      }
    }
  }

  console.log(answer.join(' ').trim());

  process.exit();
});
