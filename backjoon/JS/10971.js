const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [N] = input.shift();
  const maxNum = 1 << N;
  const dpArr = Array.from(Array(N + 1), () => Array(maxNum).fill(-1));

  const search = (current, visited) => {
    if (visited === (maxNum - 1)) {
      if (input[current][0] === 0) return Infinity;
      else return input[current][0];
    }
    if (dpArr[current][visited] !== -1) return dpArr[current][visited];

    dpArr[current][visited] = Infinity;

    for (let i = 0; i < N; i++) {
      if (input[current][i] === 0 || visited & (1 << i)) {
        continue;
      }

      dpArr[current][visited] = Math.min(dpArr[current][visited], search(i, visited | (1 << i)) + input[current][i]);
    }
    return dpArr[current][visited];
  };

  const answer = search(0, 1);
  console.log(answer);

  process.exit();
});
