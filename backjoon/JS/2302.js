const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const [n, fixedNum] = input;
  let fixedArr, answer;
  if (fixedNum > 0) fixedArr = input.slice(2);
  
  const dpArr = new Array(n + 1);
  dpArr[0] = 0;
  dpArr[1] = 1;
  dpArr[2] = 2;

  for (let i = 3; i <= n; i++) {
    dpArr[i] = dpArr[i - 1] + dpArr[i - 2];
  }
  
  if (fixedNum === 0) {
    answer = dpArr[n];
  } else {
    answer = 1;
    let start = 1, end = 1;
    for (let idx = 0; idx < fixedNum; end++) {
      if (end === fixedArr[idx]) {
        answer *= (end - start > 0 ? dpArr[end - start] : 1);
        idx++;
        start = end + 1;
      }
    }
    answer *=
      n - fixedArr[fixedNum - 1] > 0 ? dpArr[n - fixedArr[fixedNum - 1]] : 1;
  }

  console.log(answer);
  process.exit();
});
