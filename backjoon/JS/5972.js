const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class PriorityQueue {
  constructor () {
    this.queue = [];
  }

  enqueue (el) {
    this.queue.push(el);
  }

  dequeue () {
    const popped = this.queue.shift();

    return popped;
  }

  sort () {
    this.queue.sort((a, b) => a.weight - b.weight);
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift(); // 헛간 개수, 소들의 길 개수
  const adjacencyList = {};
  const distances = {};
  const queue = new PriorityQueue();
  
  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
    if (i !== 1) {
      distances[i] = Infinity;
      queue.enqueue({ node: i, weight: Infinity });
    }
    if (i === 1) {
      distances[1] = 0;
      queue.enqueue({ node: 1, weight: 0 });
    }
  }

  input.forEach((el) => {
    const [v1, v2, cow] = el;
    adjacencyList[v1].push({ node: v2, weight: cow });
    adjacencyList[v2].push({ node: v1, weight: cow });
  });

  while (queue.queue.length) {
    const current = queue.dequeue();

    for (let neighbor of adjacencyList[current.node]) {
      const newDistance = distances[current.node] + neighbor.weight;

      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        queue.enqueue({ node: neighbor.node, weight: newDistance });
      }
    }
  }

  const answer = distances[n];
  console.log(answer);

  process.exit();
});
