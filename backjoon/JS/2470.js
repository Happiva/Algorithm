const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const arr = input.shift().sort((a, b) => a - b);

  let start = 0, end = n - 1, min = Infinity, answer;

  while (start < end) {
    const sum = arr[start] + arr[end];

    if (Math.abs(sum) < Math.abs(min)) {
      min = sum;
      answer = [arr[start], arr[end]];
    }

    if (sum === 0) break;

    if (sum > 0) {
      end--;
    } else if (sum === 0) {
      break;
    } else {
      start++;
    }
  }

  console.log(answer.join(' ').trimEnd());
  process.exit();
});
