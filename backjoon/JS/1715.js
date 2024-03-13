const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class MinHeap {
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
    const node = this.queue[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentNode = this.queue[parentIdx];

      if (node > parentNode) break;

      this.queue[idx] = parentNode;
      this.queue[parentIdx] = node;
      idx = parentIdx;
    }
  }
  
  bubbleDown () {
    let idx = 0;
    const node = this.queue[idx];
    const length = this.queue.length;

    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const leftChildNode = this.queue[leftChildIdx];
      const rightChildIdx = 2 * idx + 2;
      const rightChildNode = this.queue[rightChildIdx];
      let swap = null;

      if (leftChildIdx < length) {
        if (leftChildNode < node) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        if ((
          swap === null && rightChildNode < node
        ) || (
          swap !== null && rightChildNode < this.queue[swap]
        )) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.queue[idx] = this.queue[swap];
      this.queue[swap] = node;
      idx = swap;
    }
  }
}


rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const n = input.shift();

  let answer = 0;
  const minHeap = new MinHeap();
  for (let i = 0; i < n; i++) {
    minHeap.enqueue(input[i]);
  }

  for (let i = 0; i < n - 1; i++) {
    const a = minHeap.dequeue();
    const b = minHeap.dequeue();
    answer += a + b;
    minHeap.enqueue(a + b);
  }

  console.log(answer);
  process.exit();
});
