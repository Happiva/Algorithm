const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on("close", function () {
  const [testCase] = input.shift();
  const answer = [];

  for (let i = 0; i < testCase; i++) {
    const [n] = input[0];
    const logArr = input[1].sort((a, b) => a - b);
    const arr = new Array(n);

    let left = 0, right = n - 1, max = -Infinity;
    for (let j = 0; j < n; j++) {
      if (j === 0 || j % 2 === 0) {
        arr[left++] = logArr[j];
      } else {
        arr[right--] = logArr[j];
      }
    }
    console.log(arr);
    for (let j = 0; j < n; j++) {
      max = Math.max(max, Math.abs(arr[j] - arr[(j + 1) % n]));
    }
    answer.push(max);

    input.splice(0, 2);
  }
  console.log(answer.join('\n').trim());

  process.exit();
});
