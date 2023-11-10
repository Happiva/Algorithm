const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const distance = input[1];
  const cost = input[2];

  let minimum = cost[0];
  let sum = BigInt(distance[0] * minimum);

  for (let i = 1; i < cost.length - 1; i++) {
    if (minimum > cost[i]) {
      minimum = cost[i];
    }
    sum += BigInt(minimum * distance[i]);
  }
  console.log(sum.toString());

  process.exit();
});
