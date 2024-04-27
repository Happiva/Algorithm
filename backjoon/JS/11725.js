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
  const answer = [];
  const adjacencyList = {};
  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < input.length; i++) {
    const [a, b] = input[i];
    adjacencyList[a].push(b);
    adjacencyList[b].push(a);
  }

  const visited = new Array(n + 1).fill(false);

  let queue = [1];
  while (queue.length) {
    const current = queue.shift();
    visited[current] = true;

    adjacencyList[current].forEach((el) => {
      if (!visited[el]) {
        answer[el] = current;
        queue.push(el);
      }
    });
  }

  console.log(answer.slice(2).join('\n').trimEnd());
  process.exit();
});
