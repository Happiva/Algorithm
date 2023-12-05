const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Stack {
  constructor(size) {
    this.stack = new Array(size + 1);
    this.top = -1;
  }

  push(el) {
    if (this.top === this.stack.length - 1) return -1;
    else this.stack[++this.top] = el;
  }

  pop() {
    if (this.top === -1) return -1;
    else return this.stack[this.top--];
  }

  isEmpty() {
    return this.top === -1;
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [str, bomb] = input;

  const stack = new Stack(str.length);

  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);

    const sliced = stack.stack
      .slice(stack.top - bomb.length + 1, stack.top + 1)
      .join("");

    if (sliced === bomb) {
      stack.top -= bomb.length;
    }
  }
  const answer = stack.stack.slice(0, stack.top + 1).join('');
  console.log(answer === "" ? "FRULA" : answer);

  process.exit();
});
