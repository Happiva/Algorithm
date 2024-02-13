const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const balloons = input[0];
  const needles = new Array(1000001).fill(0);
  needles[balloons[0] - 1] = 1;
  let answer = 0;

  for (let i = 1; i < n; i++) {
    const height = balloons[i];
    if (needles[height]) {
      needles[height]--;
    }
    needles[height - 1]++;
  }

  needles.forEach((el) => answer += el);
  console.log(answer);

  process.exit();
});
