const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split('');
}).on("close", function () {
  const answer = new Set();
  let stack = [];
  const parenthesis = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') stack.push(i);
    if (input[i] === ')') {
      const popped = stack.pop();
      parenthesis.push([popped, i]);
    }
  }

  const bitLength = parenthesis.length;
  
  const removeParenthesis = (checked) => {
    let str = '';
    const remained = new Array(input.length).fill(true);
    for (const index in checked) {
      if (checked[index] === '1') {
        const [open, close] = parenthesis[index];
        remained[open] = false;
        remained[close] = false;
      }
    }

    input.forEach((v, index) => {
      if (remained[index]) str += v;
    });

    return str;
  };

  for (let num = 1; num < Math.pow(2, bitLength); num++) {
    const visited = num.toString(2).padStart(bitLength, "0");
    answer.add(removeParenthesis(visited));
  }

  const answerArr = Array.from(answer);
  console.log(
    answerArr
      .sort()
      .join("\n")
      .trimEnd()
  );
  process.exit();
});
