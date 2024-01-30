const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class MinHeap {
  constructor () {
    this.heap = [];
  }

  enqueue (el) {
    this.heap.push(el);
    this.bubbleUp();
  }
  
  dequeue () {
    const root = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return root;
  }

  bubbleUp () {
    const node = this.heap[this.heap.length - 1];
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentNode = this.heap[parentIdx];

      if (node.cost > parentNode.cost) break;

      this.heap[idx] = parentNode;
      this.heap[parentIdx] = node;
      idx = parentIdx;
    }
  }

  bubbleDown () {
    let idx = 0;
    const node = this.heap[idx];
    const length = this.heap.length;

    while (true) {
      const leftChildIdx = (idx * 2) + 1;
      const rightChildIdx = (idx * 2) + 2;
      let swap = null;

      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx].cost < node.cost) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        if ((
          swap ===  null && this.heap[rightChildIdx].cost < node.cost
        ) || (
          swap !== null && this.heap[rightChildIdx].cost < this.heap[swap].cost
        )) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = node;
      idx = swap;
    }
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m, x] = input.shift(); // 학생 N, 도로 수 M, 모일 마을 X
  const result = new Array(n);
  let answer = 0;

  for (let i = 0; i < n; i++) {
    result[i] = new Array(n).fill(0);
  }

  const adjacencyList = {};
  for (let i = 1; i <= n; i++) adjacencyList[i] = [];

  for (let i = 0; i < m; i++) {
    const [start, end, cost] = input[i];
    adjacencyList[start].push({ node: end.toString(), cost });
  }

  for (let i = 1; i <= n; i++) {
    const queue = new MinHeap();
    const distances = {};
    for (let j = 1; j <= n; j++) {
      if (j === i) distances[j] = 0;
      else distances[j] = Infinity;
    }
    queue.enqueue({ node: i, cost: 0 });

    while (queue.heap.length > 0) {
      const { node: currentNode } = queue.dequeue();
      adjacencyList[currentNode].forEach((el) => {
        const newDistance = el.cost + distances[currentNode];

        if (newDistance < distances[el.node]) {
          distances[el.node] = newDistance;
          queue.enqueue({ node: el.node, cost: newDistance });
        }
      });
    }
    for (let j = 1; j <=n; j++) {
      result[i - 1][j - 1] = distances[j];
    }
  }
  
  for (let i = 0; i < n; i++) {
    const sum = result[i][x - 1] + result[x - 1][i];
    answer = Math.max(sum, answer);
  }
  console.log(answer);

  process.exit();
});
