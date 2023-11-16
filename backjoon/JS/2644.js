const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Graph {
  constructor(num) {
    this.adjacencyList = {};

    for (let i = 1; i <= num; i++) {
      this.adjacencyList[i] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
  
  startBfs(start, target) {
    let visited = {};
    const queue = [start];
    const adjacencyList = this.adjacencyList;
    visited[start] = 1;

    while (queue.length > 0) {
      const currentVertex = queue.shift();

      if (currentVertex === target) {
        break;
      }

      adjacencyList[currentVertex].forEach((v) => {
        if (!visited[v]) {
          queue.push(v);
          visited[v] = visited[currentVertex] + 1;
        }
      });
    }

    return visited[target];
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const people = input.shift();
  const [start, target] = input.shift();

  const graph = new Graph(people);

  for (let i = 1; i < input.length; i++) {
    const [v1, v2] = input[i];
    graph.addEdge(v1, v2);
  }

  const result = graph.startBfs(start, target);

  console.log(result ? result - 1 : -1);

  process.exit();
});
