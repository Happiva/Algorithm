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

      if (parentNode < node) break;

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
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [testCase] = input.shift();
  let answer = [];

  for (let i = 0; i < testCase; i++) {
    const [n] = input[0];
    const arr = input[1];

    const minHeap = new MinHeap();
    arr.forEach((el) => minHeap.enqueue(el));
    let sum = 0;

    for (let j = 0; j < n - 1; j++) {
      const num1 = minHeap.dequeue();
      const num2 = minHeap.dequeue();
      const num = num1 + num2;
      minHeap.enqueue(num);
      sum += num;
    }

    answer.push(sum);
    input.splice(0, 2);
  }

  console.log(answer.join('\n').trimEnd());
  process.exit();
});
