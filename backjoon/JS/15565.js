const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input.shift();
  const arr = input[0];
  
  let p1 = 0, p2 = 0, num = 0;
  let answer = Infinity;

  while (p2 < n) {
    if (num < k) {
      if (arr[p2] === 1) {
        num++;

        if (num < k) p2++;
      } else p2++;
    }

    if (num === k) {
      while (arr[p1] !== 1) {
        p1++;
      }

      answer = Math.min(answer, p2 - p1 + 1);
      p1++;
      p2++;
      num--;
    }
  }

  console.log(answer === Infinity ? -1 : answer);

  process.exit();
});
