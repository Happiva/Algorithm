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
    this.bubbleUp();
  }

  dequeue () {
    const root = this.queue[0];
    const end = this.queue.pop();

    if (this.queue.length > 0) {
      this.queue[0] = end;
      this.bubbleDown();
    }

    return root;
  }

  bubbleUp () {
    let idx = this.queue.length - 1;
    let node = this.queue[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.queue[parentIdx];

      if (parent <= node) break;

      this.queue[parentIdx] = node;
      this.queue[idx] = parent;
      idx = parentIdx;
    }
  }

  bubbleDown () {
    let idx = 0;
    let node = this.queue[idx];
    const length = this.queue.length;

    while (true) {
      const leftChildIdx = idx * 2 + 1;
      const rightChildIdx = idx * 2 + 2;
      let swap = null;

      if (leftChildIdx < length) {
        if (this.queue[leftChildIdx] < this.queue[idx]) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        if (
          swap === null && this.queue[rightChildIdx] < this.queue[idx] ||
          swap !== null && this.queue[rightChildIdx] < this.queue[leftChildIdx]
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.queue[idx] = this.queue[swap];
      this.queue[swap] = node;
      idx = swap;
    }
  }

  getLength () {
    return this.queue.length;
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift(); // 문제 수, 먼저 푸는 게 좋은 문제에 대한 정보 수
  const answer = [];
  const adjacencyList = {};
  const edgesInfo = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < m; i++) {
    const [v1, v2] = input[i];
    adjacencyList[v1].push(v2);
    edgesInfo[v2]++;
  }

  const queue = new PriorityQueue();

  for (let i = 1; i <= n; i++) {
    if (edgesInfo[i] === 0) queue.enqueue(i);
  }

  while (queue.getLength()) {
    const v = queue.dequeue();

    adjacencyList[v].forEach(neighbor => {
      edgesInfo[neighbor]--;
      if (edgesInfo[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    });

    answer.push(v);
  }

  console.log(answer.join(' ').trimEnd());
  process.exit();
});
