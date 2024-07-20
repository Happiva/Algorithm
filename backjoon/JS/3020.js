const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, h] = input.shift().split(' ').map(el => parseInt(el));
  const arr = input.map(el => parseInt(el));

  const top = new Array(h + 1).fill(0);
  const bottom = new Array(h + 1).fill(0);
  const sum = new Array(h + 1).fill(0);

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      bottom[arr[i]]++;
    } else {
      top[arr[i]]++;
    }
  }

  for (let i = h - 1; i > 0; i--) {
    bottom[i] += bottom[i + 1];
    top[i] += top[i + 1];
  }

  sum[1] = top[1] + bottom[h];
  sum[h] = top[h] + bottom[1];

  for (let i = 2; i < h; i++) {
    sum[i] = bottom[i] + top[h - (i - 1)];
  }

  let min = Infinity, minPath;

  for (let i = 1; i < sum.length; i++) {
    if (sum[i] < min) min = sum[i];
  }
  minPath = sum.slice(1).filter((a) => a === min).length;

  console.log(min, minPath);

  process.exit();
});
