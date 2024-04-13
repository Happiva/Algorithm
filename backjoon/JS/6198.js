const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const n = input.shift();
  let answer = 0;

  // for (let i = 0; i < n; i++) {
  //   const current = input[i];
  //   let num = 0;

  //   for (let j = i + 1; j < n; j++) {
  //     if (input[j] < current) num++;
  //     else break;
  //   }
  //   answer += num;
  // }

  let stack = [input[0]];
  for (let i = 1; i < n; i++) {
    const current = input[i];
    while (stack.length && stack[stack.length - 1] <= current) {
      stack.pop();
    }

    stack.push(current);
    answer += (stack.length - 1);
  }

  console.log(answer);
  process.exit();
});
