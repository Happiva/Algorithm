const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [c, n] = input.shift();
  const dpArr = new Array(1101).fill(Infinity);
  dpArr[0] = 0;
  const sorted = input.sort((a, b) => a[1] - b[1]);
  
  for (let i = 0; i < n; i++) {
    const [cost, num] = sorted[i];
    for (let j = sorted[i][1]; j < dpArr.length; j++) {
      if (dpArr[i - num] === Infinity) continue;
      dpArr[j] = Math.min(dpArr[j - num] + cost, dpArr[j]);
    }
  }

  console.log(Math.min(...dpArr.slice(c)));
  process.exit();
});
