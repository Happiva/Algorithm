const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  const qSize = input + 1;
  let queue = new Array(qSize);
  for (let i = 0; i < qSize; i++) {
    queue[i] = i;
  }
  let front = 0;
  let rear = input;
  let element = input;

  if (input === 1) {
    console.log(1);
    process.exit();
  }

  while (front !== rear) {
    queue[(front + 1) % qSize] = 0;
    front = (front + 1) % qSize;
    element--;

    if (element === 1) break;

    const temp = queue[(front + 1) % qSize];
    queue[(front + 1) % qSize] = 0;
    front = (front + 1) % qSize;
    rear = (rear + 1) % qSize;
    queue[rear] = temp;
  }
  console.log(queue[rear]);

  process.exit();
});
