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
  const visited = {};

  for (let i = 1; i <= n; i++) adjacencyList[i] = [];

  for (let i = 0; i < m; i++) {
    const [start, end] = input[i];
    adjacencyList[start].push(end);
    adjacencyList[end].push(start);
  }
  
  let queue = [1];
  visited[1] = 0;

  while (queue.length) {
    const current = queue.shift();
    const distance = visited[current];

    for (let j = 0; j < adjacencyList[current].length; j++) {
      const neighbor = adjacencyList[current][j];
      if (!visited[neighbor] && neighbor !== 1) {
        queue.push(neighbor);
        visited[neighbor] = distance + 1;
      }
    }
  }

  let maxDistance = Math.max(...Object.values(visited));
  let target = Infinity, candidates = 0;

  for (key in visited) {
    if (visited[key] === maxDistance) {
      candidates++;
      target = Math.min(target, parseInt(key));
    }
  }

  console.log(target, maxDistance, candidates);

  process.exit();
});
