const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, m] = input.shift().split(' ').map((el) => parseInt(el));

  const set = new Set(input.slice(0, n));
  const answer = [];

  for (let i = n; i < input.length; i++) {
    const keywords = input[i].split(',');
    keywords.forEach((el) => {
      set.delete(el);
    });

    answer.push(set.size);
  }
  console.log(answer.join('\n'));

  process.exit();
});
