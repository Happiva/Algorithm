const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const t = parseInt(input.shift());
  let answer = '';

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[0]);
    if (n === 0) {
      answer += '0\n';
      input = input.slice(n + 1);
      continue;
    }
    let totalCase = 0;

    const obj = {};
    for (let j = 1; j <= n; j++) {
      const [, type] = input[j].split(' ');
      obj[type] = obj[type] != null ? obj[type] + 1 : 1;
    }

    if (Object.keys(obj).length === 1) {
      answer += n.toString() + '\n';
    } else {
      let value = 1;
      for (const property in obj) {
        value *= obj[property] + 1;
      }
      totalCase += value;

      answer += (totalCase - 1).toString() + '\n';
    }

    input = input.slice(n + 1);
  }

  console.log(answer.trim());

  process.exit();
});
