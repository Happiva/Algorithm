const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";

class Deque {
  constructor(capacity) {
    this.size = 0;
    this.array = [];
    this.front = 0;
    this.rear = 0;
    this.capacity = capacity;

    for (let i = 0; i < capacity; i++) {
      this.array[i] = null;
    }
  }

  pushFront(el) {
    if (this.size === this.capacity) {
      return;
    }
    this.array[this.front] = el;
    this.size++;
    this.front = (this.front - 1 + this.capacity) % this.capacity;
  }

  pushBack(el) {
    if (this.size === this.capacity) {
      return;
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
    this.array[this.rear] = el;
  }

  popFront() {
    if (this.isEmpty()) return -1;
    const el = this.array[(this.front + 1) % this.capacity];
    this.size--;
    this.front = (this.front + 1) % this.capacity;
    return el;
  }

  popBack() {
    if (this.isEmpty()) return -1;
    const el = this.array[this.rear];
    this.size--;
    this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    return el;
  }

  printSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0 ? 1 : 0;
  }

  printFront() {
    if (this.isEmpty()) return -1;
    return this.array[(this.front + 1) % this.capacity];
  }

  printBack() {
    if (this.isEmpty()) return -1;
    return this.array[this.rear];
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const deque = new Deque(input[0][0]);

  for (let i = 1; i < input.length; i++) {
    const command = input[i][0];

    if (command === 1) {
      deque.pushFront(input[i][1]);
    }
    if (command === 2) {
      deque.pushBack(input[i][1]);
    }
    if (command === 3) {
      answer += `${deque.popFront()}\n`;
    }
    if (command === 4) {
      answer += `${deque.popBack()}\n`;
    }
    if (command === 5) {
      answer += `${deque.printSize()}\n`;
    }
    if (command === 6) {
      answer += `${deque.isEmpty()}\n`;
    }
    if (command === 7) {
      answer += `${deque.printFront()}\n`;
    }
    if (command === 8) {
      answer += `${deque.printBack()}\n`;
    }
  }
  console.log(answer.trim());

  process.exit();
});
