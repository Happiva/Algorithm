const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
const NUM = 1000000000;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  if (input < 10) {
    console.log(0);
    process.exit();
  }

  let dpArr = Array.from(Array(input + 1), () => Array(10));
  for (let i = 0; i < input + 1; i++) {
    for (let j = 0; j < 10; j++) {
      dpArr[i][j] = new Array(1024).fill(0);
    }
  }

  for (let num = 1; num < 10; num++) {
    dpArr[1][num][1 << num] = 1;
  }

  // 자릿수, 현재 숫자, 방문 여부
  for (let i = 2; i < input + 1; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 1024; k++) {
        if (j > 0) {
          dpArr[i][j][k | (1 << j)] += dpArr[i - 1][j - 1][k];
        }
        if (j < 9) {
          dpArr[i][j][k | (1 << j)] += dpArr[i - 1][j + 1][k];
        }
        dpArr[i][j][k | (1 << j)] %= NUM;
      }
    }
  }

  let answer = 0;
  
  for (let i = 0; i < 10; i++) {
    answer += dpArr[input][i][1023];
    answer %= NUM;
  }

  console.log(answer);
  process.exit();
});
