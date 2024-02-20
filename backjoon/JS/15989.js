const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const testCase = input.shift();
  let answer = [];

  const dpArr = Array.from(Array(10000 + 1), () => Array(4).fill(0));

  dpArr[1][1] = 1;
  dpArr[2][1] = 1;
  dpArr[2][2] = 1;
  dpArr[3][1] = 1;
  dpArr[3][2] = 1;
  dpArr[3][3] = 1;

  const dp = (num) => {
    if (!dpArr[num][3]) {
      for (let j = 4; j <= num; j++) {
        dpArr[j][1] = dpArr[j - 1][1];
        dpArr[j][2] = dpArr[j - 2][2] + dpArr[j - 2][1];
        dpArr[j][3] = dpArr[j - 3][3] + dpArr[j - 3][2] + dpArr[j - 3][1];
      }
    }

    let sum = dpArr[num][1] + dpArr[num][2] + dpArr[num][3];
    answer.push(sum);
  };

  for (let i = 0; i < testCase; i++) {
    dp(input[i]);
  }

  console.log(answer.join('\n'));

  process.exit();
});  
