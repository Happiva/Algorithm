const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const postOrder = input.shift().split('');

  const numForEng = {};
  const base = 'A'.charCodeAt(0);

  for (let i = 0; i < n; i++) {
    numForEng[String.fromCharCode(base + i)] = parseInt(input[i]);
  }

  let stack = [];

  for (let i = 0; i < postOrder.length; i++) {
    if (postOrder[i] === '+' || postOrder[i] === '-' || postOrder[i] === '*' || postOrder[i] === '/') {
      const b = stack.pop();
      const a = stack.pop();

      if (postOrder[i] === '+') stack.push(a + b);
      if (postOrder[i] === '-') stack.push(a - b);
      if (postOrder[i] === '*') stack.push(a * b);
      if (postOrder[i] === '/') stack.push(a / b);
    }
    else stack.push(numForEng[postOrder[i]]);
  }

  const answer = stack.shift().toFixed(2);
  console.log(answer);

  process.exit();
});
