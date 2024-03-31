const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split("");
}).on("close", function () {
  let sum = 0, top = -1, num = 1;
  let stack = [];

  const exit = () => {
    console.log(0);
    process.exit();
  };

  if (input.length === 1) {
    exit();
  }

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    console.log('i', i, 'num', num, 'sum', sum);
    if (current === ')') {
      if (stack[top] === '(') {
        top--;

        if (input[i - 1] === '(') {
          sum += num;
        }
        num /= 2;
      } else {
        exit();
      }
    } else if (current === ']') {
      if (stack[top] === '[') {
        top--;

        if (input[i - 1] === "[") {
          sum += num; 
        }
        num /= 3;
      } else {
        exit();
      }
    } else {
      num *= current === '(' ? 2 : 3;
      stack[++top] = current;
    }
  }

  if (top > -1) exit();

  console.log(sum);
  process.exit();
});
