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
  let stack = [[0, input.length]];

  while (stack.length) {
    const [start, end] = stack.pop();
    if (start >= end) {
      continue;
    }

    const root = input[start];
    
    let idx;
    for (idx = start + 1; idx < end; idx++) {
      if (root < input[idx]) break;
    }

    if (idx != null) {
      if (idx > start) {
        stack.push([start + 1, idx]);
      }

      if (idx !== end) {
        stack.push([idx, end]);
      }
    }
    
    answer.unshift(root);
  }

  console.log(answer.join('\n').trimEnd());
  process.exit();
});
