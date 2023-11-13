const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Graph {
  constructor(n) {
    this.adjacencyList = {};

    for (let i = 1; i <= n; i ++) {
      this.adjacencyList[i] = [];
    }
  }

  addEdges(edges) {
    for (let i = 0; i < edges.length; i++) {
      const [v1, v2] = edges[i];
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    }

    for (const key in this.adjacencyList) {
      this.adjacencyList[key].sort((a, b) => a - b);
    }
  }

  startDFS(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    const DFS = (v) => {
      if (!v) return null;
      result.push(v);
      visited[v] = true;

      adjacencyList[v].forEach((vertex) => {
        if (!visited[vertex]) return DFS(vertex);
      });
    };

    DFS(start);

    return result;
  }

  startBFS(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    visited[start] = true;
    let currentVertex;

    while (queue.length > 0) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      visited[currentVertex] = true;

      adjacencyList[currentVertex].forEach((vertex) => {
        if (!visited[vertex]) {
          visited[vertex] = true;
          queue.push(vertex);
        }
      });
    }

    return result;
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m, start] = input[0];
  const edges = input.slice(1);

  const graph = new Graph(n);
  graph.addEdges(edges);

  const dfsResult = graph.startDFS(start);
  const bfsResult = graph.startBFS(start);

  console.log(dfsResult.join(' ').trim());
  console.log(bfsResult.join(" ").trim());

  process.exit();
});
