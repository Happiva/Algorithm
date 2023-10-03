const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const MAX_STACK_SIZE = 1000000;
let answer = "";

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  let stack = new Array(MAX_STACK_SIZE);
  let top = -1;

  const push = (x) => {
    if (top < MAX_STACK_SIZE - 1) {
      stack[++top] = x;
    }
  };

  const pop = () => {
    if (top < 0) {
      answer += "-1\n";
    } else {
      answer += `${stack[top--]}\n`;
    }
  };

  const size = () => {
    answer += `${top + 1}\n`;
  };

  const isEmpty = () => {
    if (top < 0) answer += "1\n";
    else answer += "0\n";
  };

  const printTop = () => {
    if (top < 0) answer += "-1\n";
    else answer += `${stack[top]}\n`;
  };

  for (let i = 1; i < input.length; i++) {
    const command = input[i][0];

    switch (command) {
      case "1":
        const x = parseInt(input[i][1]);
        push(x);
        break;
      case "2":
        pop();
        break;
      case "3":
        size();
        break;
      case "4":
        isEmpty();
        break;
      case "5":
        printTop();
        break;
    }
  }

  console.log(answer);

  process.exit();
});
