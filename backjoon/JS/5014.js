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

  addEdges (up, down) {
    const max = Object.keys(this.adjacencyList).length;
    for (let i = 1; i <= max; i++) {
      if (i - down >= 1) {
        this.adjacencyList[i].push(i - down);
      }
      if (i + up <= max) {
        this.adjacencyList[i].push(i + up);
      }
    }
  }

  startBFS (start, goal) {
    const queue = [start];
    const visited = {};
    visited[start] = 0;
    const adjacencyList = this.adjacencyList;

    while (queue.length > 0) {
      const current = queue.shift();

      if (current === goal) {
        break;
      }

      adjacencyList[current].forEach((v) => {
        if (!visited[v] && visited[v] !== 0) {
          visited[v] = visited[current] + 1;
          queue.push(v);
        }
      });
      console.log(visited);
    }

    return visited[goal];
  }
}

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [floor, start, goal, upStairs, downStairs] = input;

  const graph = new Graph(floor);
  graph.addEdges(upStairs, downStairs);

  const result = graph.startBFS(start, goal);
  console.log(result == null ? 'use the stairs' : result);

  process.exit();
});
