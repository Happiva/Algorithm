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
  const [k] = input.shift();
  let answer = 0;
  const sensor = input[0].sort((a, b) => a - b);
  
  let distance = [];

  for (let i = 1; i < sensor.length; i++) {
    distance.push(sensor[i] - sensor[i - 1]);
  }

  const sliced = distance.sort((a, b) => a - b).slice(0, (n - 1) - (k - 1));
  sliced.forEach((el) => answer += el);

  console.log(answer);

  process.exit();
});
