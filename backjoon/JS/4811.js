const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  let answer = [];
  let obj = {};

  const dp = (n) => {
    const dpArr = Array.from(Array(31), () => Array(31).fill(0));

    for (let w = 1; w <= 30; w++) {
      for (let h = 0; h <= w; h++) {
        if (h === 0) dpArr[w][h] = 1;
        else dpArr[w][h] = dpArr[w][h - 1] + dpArr[w - 1][h];
      }
    }
    return dpArr[n][n];
  };

  for (let i = 0; i < input.length - 1; i++) {
    const n = input[i];

    if (obj[n]) {
      answer.push(obj[n]);
    } else {
      const result = dp(n);
      obj[n] = result;
      answer.push(result);
    }
  }

  console.log(answer.join('\n').trimEnd());
  process.exit();
});
