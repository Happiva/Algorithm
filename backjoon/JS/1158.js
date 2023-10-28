const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Queue {
  constructor(capacity) {
    this.front = 0;
    this.rear = 0;
    this.capacity = capacity;
    this.queue = [];

    for (let i = 0; i < capacity; i++) {
      this.queue.push(null);
    }
  }
  push(el) {
    if (this.front === (this.rear + 1) % this.capacity) {
      // Queue is full
      return;
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = el;
  }

  pop() {
    if (this.front === this.rear) {
      // Queue is empty
      return;
    }
    this.front = (this.front + 1) % this.capacity;
    return this.queue[this.front];
  }
}

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const num = input[0];
  const k = input[1];

  const queue = new Queue(num);
  const answer = [];

  answer.push(k);
  for (let i = k + 1; i <= num; i++) {
    queue.push(i);
  }
  for (let i = 1; i < k; i++) {
    queue.push(i);
  }

  while (answer.length < num) {
    if (answer.length < num - 1) {
      for (let i = 0; i < k - 1; i++) {
        const popedElement = queue.pop();
        queue.push(popedElement);
      }
    }

    const removed = queue.pop();
    answer.push(removed);
  }

  console.log(`<${answer.join(", ")}>`);

  process.exit();
});
