const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [-1, 0, 1, 0];
const nextRow = [0, 1, 0, -1];

class MinHeap {
  constructor () {
    this.heap = [];
  }

  enqueue (el) {
    this.heap.push(el);
    this.bubbleUp();
  }

  bubbleUp () {
    const node = this.heap[this.heap.length - 1];
    let idx = this.heap.length - 1;
    
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentNode = this.heap[parentIdx];

      if (node[2] > parentNode[2]) break;

      this.heap[idx] = parentNode;
      this.heap[parentIdx] = node;
      idx = parentIdx;
    }
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

  bubbleDown () {
    let idx = 0;
    const node = this.heap[idx];
    const length = this.heap.length;

    while (true) {
      const leftChildIdx = (idx * 2) + 1;
      const rightChildIdx = (idx * 2) + 2;
      let swap = null;

      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx][2] < node[2]) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        if ((
          (swap === null) && this.heap[rightChildIdx][2] < node[2]
        ) || (
          (swap !== null) && this.heap[rightChildIdx][2] < this.heap[swap][2]
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

const isInRange = (x, y, n) => {
  return 0 <= x && 0 <= y && x < n && y < n;
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  let answer = '';
  let testCase = 0;

  while (true) {
    const [num] = input.shift();
    if (num === 0) break;

    const board = input.slice(0, num);

    const priorityQueue = new MinHeap();
    priorityQueue.enqueue([0, 0, board[0][0]]);

    const distances = new Array(num);
    for (let i = 0; i < num; i++) distances[i] = new Array(num).fill(Infinity);
    distances[0][0] = 0;

    while (priorityQueue.heap.length > 0) {
      const [x, y, weight] = priorityQueue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nextX = x + nextCol[i];
        const nextY = y + nextRow[i];

        if (isInRange(nextX, nextY, num)) {
          const newWeight = board[nextX][nextY] + weight;
          if (newWeight < distances[nextX][nextY]) {
            distances[nextX][nextY] = newWeight;
            priorityQueue.enqueue([nextX, nextY, newWeight]);
          }
        }
      }
    }
    answer += `Problem ${++testCase}: ${distances[num - 1][num - 1]}\n`;
    input = input.slice(num);
  }

  console.log(answer.trim());

  process.exit();
});
