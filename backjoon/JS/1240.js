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
  let answer = [];

  let adjacencyList = {};
  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < n - 1; i++) {
    const [start, end, distance] = input[i];
    adjacencyList[start].push({ node: end, distance });
    adjacencyList[end].push({ node: start, distance });
  }

  const bfs = (start, target) => {
    let queue = [{ node: start, distance: 0 }];
    const visited = new Array(n + 1).fill(false);
    visited[start] = true;

    while (queue.length > 0) {
      const { node: current, distance: curDis } = queue.shift();

      if (current === target) {
        answer.push(curDis);
        break;
      }

      adjacencyList[current].forEach((neighbor) => {
        if (!visited[neighbor.node]) {
          queue.push({ node: neighbor.node, distance: curDis + neighbor.distance });
          visited[neighbor.node] = true;
        }
      });
    }
  };

  for (let i = n - 1; i < input.length; i++) {
    const [start, target] = input[i];
    bfs(start, target);
  }

  console.log(answer.join('\n'));
  process.exit();
});
