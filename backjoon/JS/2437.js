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
  const arr = input[0].sort((a, b) => a - b);
  let sum = arr[0];

  if (sum > 1) {
    console.log(1);
    process.exit();
  }

  let answer;

  for (let i = 1; i < n; i++) {
    if (sum < arr[i] && sum + 1 !== arr[i]) {
      answer = sum + 1;
      break;
    } else {
      sum += arr[i];
    }
  }

  console.log(answer ?? sum + 1);
  process.exit();
});
