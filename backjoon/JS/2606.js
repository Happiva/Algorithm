const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Graph {
  constructor (num) {
    this.adjacencyList = {};

    for (let i = 1; i <= num; i++) {
      this.adjacencyList[i] = [];
    }
  }

  addEdge (v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  startDfs () {
    let visited = {};
    const adjacencyList = this.adjacencyList;
    const result = [];

    const dfs = (v) => {
      if (v == null) return null;

      result.push(v);
      visited[v] = true;

      for (let el of adjacencyList[v]) {
        if (!visited[el]) {
          dfs(el);
        }
      }
    };

    dfs(1);
    return result.length;
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const computers = input.shift();

  const graph = new Graph(computers);

  for (let i = 1; i < input.length; i++) {
    const [v1, v2] = input[i];
    graph.addEdge(v1, v2);
  }

  const result = graph.startDfs();
  console.log(result - 1);

  process.exit();
});
