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

    for (let i = 0; i < capacity; i++) {
      this.array[i] = null;
    }
  }

  pushFront(el) {
    if (this.size === this.array.length) {
      // Deque is full!
      return;
    }
    this.array[this.front] = el;
    this.front = (this.front - 1 + this.array.length) % this.array.length;
    this.size++;
  }

  pushBack(el) {
    if (this.size === this.array.length) {
      // Deque is full!
      return;
    }
    this.rear = (this.rear + 1) % this.array.length;
    this.array[this.rear] = el;
    this.size++;
  }

  popFront() {
    if (this.isEmpty()) {
      return -1;
    }
    this.front = (this.front + 1) % this.array.length;
    this.size--;
    return this.array[this.front];
  }

  popBack() {
    if (this.isEmpty()) {
      return -1;
    }
    const el = this.array[this.rear];
    this.rear = (this.rear - 1 + this.array.length) % this.array.length;
    this.size--;

    return el;
  }

  printSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0 ? 1 : 0;
  }

  printFront() {
    if (this.isEmpty()) {
      return -1;
    }

    return this.array[(this.front + 1) % this.array.length];
  }

  printBack() {
    if (this.isEmpty()) {
      return -1;
    }

    return this.array[this.rear];
  }
}

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const deque = new Deque(parseInt(input[0][0]));

  for (let i = 1; i < input.length; i++) {
    const action = input[i][0];

    switch (action) {
      case "push_front":
        deque.pushFront(parseInt(input[i][1]));
        break;
      case "push_back":
        deque.pushBack(parseInt(input[i][1]));
        break;
      case "pop_front":
        answer += `${deque.popFront()}\n`;
        break;
      case "pop_back":
        answer += `${deque.popBack()}\n`;
        break;
      case "size":
        answer += `${deque.printSize()}\n`;
        break;
      case "empty":
        answer += `${deque.isEmpty()}\n`;
        break;
      case "front":
        answer += `${deque.printFront()}\n`;
        break;
      case "back":
        answer += `${deque.printBack()}\n`;
        break;
    }
  }

  console.log(answer.trim());

  process.exit();
});
