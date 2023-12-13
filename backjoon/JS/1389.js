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

  addGraph (v1, v2) {
    if (this.adjacencyList[v1].includes(v2)) {
      return;
    };

    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  BFS (start) {
    const queue = [start];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    visited[start] = 0;
    let answer = 0;

    while (queue.length > 0) {
      const current = queue.shift();

      adjacencyList[current].forEach((v) => {
        if (visited[v] == null) {
          visited[v] = visited[current] + 1;
          answer += visited[v];

          queue.push(v);
        }
      });
    }
    
    return answer;
  }
}

rl.on("line", (line) => {
  input.push(line.split(' '));
}).on("close", function () {
  const [n, ] = input.shift().map((el) => parseInt(el));
  const graph = new Graph(n);
  const answer = [];

  for (let i = 0; i < input.length; i++) {
    const [v1, v2] = input[i];
    graph.addGraph(v1, v2);
  }

  for (let i = 1; i <= n; i++) {
    const distance = graph.BFS(i.toString());
    answer.push([i, distance]);
  }

  answer.sort((arr1, arr2) => {
    if (arr1[1] === arr2[1]) {
      return arr1[0] - arr2[0];
    }
    return arr1[1] - arr2[1];
  });

  console.log(answer[0][0]);

  process.exit();
});
