const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  const adjacencyList = {};
  let answer = 0;

  if (m === 0) {
    console.log(n);
    process.exit();
  }

  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }
  input.forEach((arr) => {
    const [v1, v2] = arr;
    adjacencyList[v1].push(v2);
    adjacencyList[v2].push(v1);
  });

  const visited = {};

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      const stack = [i];

      while (stack.length > 0) {
        const current = stack.pop();
        visited[current] = true;

        adjacencyList[current].forEach((el) => {
          if (!visited[el]) {
            stack.push(el);
          }
        });
      }
      answer++;
    }
  }

  console.log(answer);

  process.exit();
});
