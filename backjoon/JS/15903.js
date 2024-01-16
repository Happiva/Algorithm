const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => parseInt(el)));

class MinHeap {
  constructor () {
    this.heap = [];
  }
  insert (num) {
    this.heap.push(num);
    this.bubbleUp();
  }
  bubbleUp () {
    let idx = this.heap.length - 1;
    const node = this.heap[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];

      if (node > parent) break;

      this.heap[parentIdx] = node;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }
  remove () {
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
    const node = this.heap[0];
    const length = this.heap.length;

    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let swap = null;

      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx] < node) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        if ((swap === null && this.heap[rightChildIdx] < node) || (swap !== null && this.heap[rightChildIdx] < this.heap[swap])) {
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

const [n, m] = input[0];
let answer = BigInt(0), num = 0;
const priorityQueue = new MinHeap();

input[1].forEach(el => priorityQueue.insert(BigInt(el)));

while (num < m) {
  const node1 = priorityQueue.remove();
  const node2 = priorityQueue.remove();

  const newValue = node1 + node2;
  priorityQueue.insert(newValue);
  priorityQueue.insert(newValue);
  num++;
}

priorityQueue.heap.forEach((el) => answer += el);

console.log(answer.toString());
