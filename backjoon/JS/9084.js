const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const testCase = parseInt(input.shift());
  let answer = [];

  for (let i = 0; i < testCase; i++) {
    const n = parseInt(input[0]);
    const coinArr = input[1].split(' ').map((el) => parseInt(el));
    const target = parseInt(input[2]);

    const dpArr = new Array(target + 1).fill(0);
    dpArr[0] = 1;

    for (let j = 0; j < n; j++) {
      const coin = coinArr[j];

      for (let k = coin; k <= target; k++) {
        dpArr[k] += dpArr[k - coin];
      }
    }
    answer.push(dpArr[target]);

    input.splice(0, 3);
  }

  console.log(answer.join('\n'));
  process.exit();
});
