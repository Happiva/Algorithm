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
  const adjacencyList = {};
  const maxDistance = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < input.length - 1; i++) {
    const [node1, node2] = input[i];
    adjacencyList[node1].push(node2);
    adjacencyList[node2].push(node1);
  }

  for (let i = 1; i <= n; i++) {
    let queue = [i];
    let visited = new Array(n + 1).fill(0);
    visited[i] = 1;

    while (queue.length > 0) {
      const current = queue.shift();
      const curDis = visited[current];

      adjacencyList[current].forEach((neighbor) => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = curDis + 1;
        }
      });
    }
    maxDistance[i] = Math.max(...visited) - 1;
  }
  const min = Math.min(...(maxDistance.slice(1)));
  const candidate = [];
  maxDistance.forEach((el, index) => {
    if (el === min) candidate.push(index);
  });

  console.log(min, candidate.length);
  console.log(candidate.join(' '));
  process.exit();
});
