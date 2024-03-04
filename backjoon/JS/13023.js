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
  let answer = false;
  const adjacencyList = {};
  for (let i = 0; i < n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < m; i++) {
    const [node1, node2] = input[i];
    adjacencyList[node1].push(node2);
    adjacencyList[node2].push(node1);
  }

  const visited = new Array(n).fill(false);
  const dfs = (node, num) => {
    visited[node] = true;
    if (num === 4) {
      answer = true;
      return;
    }

    adjacencyList[node].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        dfs(neighbor, num + 1);
        visited[neighbor] = false;
      }
    });
  };

  for (let i = 0; i < n; i++) {
    visited.fill(false);
    if (answer) break;
    dfs(i, 0);
  }

  console.log(answer ? 1 : 0);
  process.exit();
});
