const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  // 1. 곱했을 때 G가 나오는 조합을 찾는다
  // 2. 그 조합을 더해서 2로 나눈게 답
  const answer = [];
  for (let i = input; i > 0; i--) {
    if (input % i !== 0) continue;
    const j = input / i;

    if (i <= j) break;

    if (i > j) {
      if ((i + j) % 2 === 0) {
        answer.push((i + j) / 2);
      }
    }
  }
  if (answer.length === 0) {
    console.log(-1);
    process.exit();
  }

  console.log(answer.reverse().join('\n').trim());
  process.exit();
});
