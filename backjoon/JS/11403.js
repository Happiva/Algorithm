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
  const board = input;
  let answer = '';

  const pathArr = new Array(n);
  for (let i = 0; i < n; i++) pathArr[i] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const visited = new Array(n).fill(false);
    let queue = [i];

    while (queue.length > 0) {
      const current = queue.shift();

      for (let j = 0; j < n; j++) {
        if (!visited[j] && board[current][j] === 1) {
          queue.push(j);
          visited[j] = true;
        }
      }
    }
    visited.forEach((el, index) => pathArr[i][index] = el ? 1 : 0);
  }

  pathArr.forEach((arr) => answer += arr.join(' ') + '\n');
  console.log(answer.trim());

  process.exit();
});
