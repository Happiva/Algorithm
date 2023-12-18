const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Node {
  constructor (value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor () {
    this.queue = [];
  }

  enqueue (value, priority) {
    const newNode = new Node(value, priority);
    this.queue.push(newNode);
    this.bubbleUp();
  }

  bubbleUp () {
    let idx = this.queue.length - 1;
    let node = this.queue[idx];

    while (idx > 0) {
      const parentIdx = Math.floor(idx / 2);
      const parentNode = this.queue[parentIdx];

      if (node.priority >= parentNode.priority) break;
      this.queue[parentIdx] = node;
      this.queue[idx] = parentNode;
      idx = parentIdx;
    }
  }

  dequeue () {
    const root = this.queue[0];
    const end = this.queue[this.queue.length - 1];

    if (this.queue.length > 0) {
      this.queue[0] = end;
      this.bubbleDown();
    }

    return root;
  }

  bubbleDown () {
    let idx = 0;
    let node = this.queue[0];
    const length = this.queue.length;

    while (true) {
      // 나보다 작은 priority의 자식을 위에 올려야 함
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let toSwap = null;

      if (leftChildIdx < length) {
        if (this.queue[leftChildIdx].priority < node.priority) {
          toSwap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        if (
          (toSwap === null && this.queue[rightChildIdx].priority < node.priority) ||
          (toSwap !== null && this.queue[rightChildIdx].priority < this.queue[toSwap].priority)
        ) {
          toSwap = rightChildIdx;
        }
      }

      if (toSwap === null) break;
      this.queue[idx] = this.queue[toSwap];
      this.queue[toSwap] = node;
      idx = toSwap;
    }
  }
}

class WeightedGraph {
  constructor(num) {
    this.adjacencyList = {};

    for (let i = 1; i <= num; i++) {
      this.adjacencyList[i] = [];
    }
  }
  addEdge(start, end, weight) {
    this.adjacencyList[start].push({ node: end.toString(), weight });
  }
  dijkstra (start, finish) {
    const priorityQueue = new PriorityQueue();
    const distances = {}; // 각 점까지의 최소 거리
    const previous = {};
    let smallest;

    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        priorityQueue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        priorityQueue.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (priorityQueue.queue.length) {
      smallest = priorityQueue.dequeue().value;
      if (smallest === finish) {
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let n in this.adjacencyList[smallest]) {
          const next = this.adjacencyList[smallest][n];
          const newDistance = distances[smallest] + next.weight;
          
          if (newDistance < distances[next.node]) {
            distances[next.node] = newDistance;
            previous[next.node] = smallest;
            priorityQueue.enqueue(next.node, newDistance);
          }
        }
      }
    }
    return distances[finish];
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const m = parseInt(input.shift());

  const graph = new WeightedGraph(n);
  
  // 출발도시 번호, 도착지 도시번호, 버스 비용
  // 마지막 줄 => 구하고자 하는 출발점 도시번호 + 도착점 도시번호

  for (let i = 0; i < m; i++) {
    const [start, end, weight] = input[i].split(' ').map((el) => parseInt(el));
    graph.addEdge(start, end, weight);
  }
  const [start, end] = input[input.length - 1].split(' ');

  const answer = graph.dijkstra(start, end);
  console.log(answer);

  process.exit();
});
