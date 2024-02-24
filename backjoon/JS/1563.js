const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
const num = 1000000;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  const dpArr = new Array(input + 1);

  for (let i = 0; i < input + 1; i++) {
    dpArr[i] = new Array(3);
    for (let j = 0; j < 3; j++) {
      dpArr[i][j] = new Array(2).fill(0);
    }
  }
  dpArr[1][0][0] = 1;
  dpArr[1][0][1] = 1;
  dpArr[1][1][0] = 1;
  
  for (let n = 2; n <= input; n++) {
    dpArr[n][0][0] =
      (dpArr[n - 1][0][0] + dpArr[n - 1][2][0] + dpArr[n - 1][1][0]) % num;
    dpArr[n][0][1] =
      (dpArr[n - 1][0][0] +
        dpArr[n - 1][0][1] +
        dpArr[n - 1][1][0] +
        dpArr[n - 1][1][1] +
        dpArr[n - 1][2][0] +
        dpArr[n - 1][2][1]) %
      num;
    dpArr[n][1][0] = dpArr[n - 1][0][0] % num;
    dpArr[n][2][0] = dpArr[n - 1][1][0] % num;
    dpArr[n][1][1] = dpArr[n - 1][0][1] % num;
    dpArr[n][2][1] = dpArr[n - 1][1][1] % num;
  }

  let answer =
    (dpArr[input][0][0] +
    dpArr[input][0][1] +
    dpArr[input][1][0] +
    dpArr[input][1][1] +
    dpArr[input][2][0] +
    dpArr[input][2][1]) % num;

  console.log(answer);
  process.exit();
});
