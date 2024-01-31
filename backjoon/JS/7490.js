const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const testCase = input.shift();
  let answer = '';

  const calculate = (arr) => {
    let stack = [1];
    let num = 2;
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === ' ') {
        const popped = stack.pop();
        stack.push(popped * 10 + num);
        num++;
      } else stack.push(num++);
    }
    let sum = stack.shift();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === ' ') continue;
      else if (arr[i] === '+') {
        sum += stack.shift();
      } else {
        sum -= stack.shift();
      }
    }

    if (sum === 0) {
      let expression = "";
      for (let i = 0; i < arr.length + 1; i++) {
        if (i < arr.length) {
          expression += `${i + 1}${arr[i]}`;
        } else expression += `${i + 1}`;
      }
      answer += expression + '\n';
    };
  };

  const backtrack = (num, target, arr) => {
    if (num < target - 1) {
      // ' '
      backtrack(num + 1, target, [...arr, ' ']);

      // '+'
      backtrack(num + 1, target, [...arr, "+"]);

      // '-'
      backtrack(num + 1, target, [...arr, "-"]);
    } else if (num === target - 1) {
      calculate(arr);
    }
  };

  for (let i = 0; i < testCase; i++) {
    backtrack(0, input[i], []);

    answer += "\n";
  }

  console.log(answer.trim());

  process.exit();
});
