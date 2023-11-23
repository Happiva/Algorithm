const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  const arr = new Array(input + 1);
  for (let i = 1; i <= input; i++) {
    if (i === 1) {
      arr[i] = [1, 1, 1];
    } else arr[i] = [0, 0, 0];
  }

  if (input > 1) {
    for (let i = 2; i <= input; i++) {
      arr[i][1] = (arr[i - 1][0] + arr[i - 1][1] + arr[i - 1][2]) % 9901;
      arr[i][0] = (arr[i - 1][0] + arr[i - 1][1]) % 9901;
      arr[i][2] = (arr[i - 1][2] + arr[i - 1][1]) % 9901;
    }
  }

  let answer = 0;
  arr[input].forEach((el) => answer += el);
  console.log(answer % 9901);

  process.exit();
});
