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
  const [m] = input.shift();
  const adjacencyArr = input.splice(0, n);
  const visited = new Array(n).fill(false);
  const plan = input[0].map((el) => el - 1);
  let answer = 'YES';

  let queue = [plan[0]];
  while (queue.length) {
    const current = queue.shift();
    visited[current] = true;

    for (let i = 0; i < n; i++) {
      if (adjacencyArr[current][i] && !visited[i]) {
        queue.push(i);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    if (!visited[plan[i]]) {
      answer = 'NO';
      break;
    }
  }

  console.log(answer);

  process.exit();
});
