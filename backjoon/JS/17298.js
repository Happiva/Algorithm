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
  const arr = input.shift();
  let answer = new Array(n).fill(-1);
  let stack = [], top = -1;

  for (let i = 0; i < n; i++) {
    const current = arr[i];

    while (top > -1 && stack[top][0] < current) {
      const [, idx] = stack[top--];
      answer[idx] = current;
    }
    
    stack[++top] = [current, i];
  }

  console.log(answer.join(' ').trimEnd());
  process.exit();
});
