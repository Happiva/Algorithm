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
  const obj = {};
  let answer = 0;

  for (let i = 0; i < n; i++) {
    let word = input[i].split('');
    let length = word.length;

    for (let j = 0; j < word.length; j++) {
      obj[word[j]] = obj[word[j]]
        ? Math.pow(10, length - j - 1) + obj[word[j]]
        : Math.pow(10, length - j - 1);
    }
  }
  let sorted = Object.values(obj).sort((a, b) => b - a);
  let num = 9;

  for (let idx = 0; idx < sorted.length; idx++) {
    answer += sorted[idx] * num--;
  }

  console.log(answer);
  process.exit();
});
