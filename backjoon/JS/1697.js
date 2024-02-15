const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [n, k] = input;
  const visited = new Array(100001).fill(0);

  if (n === k) {
    console.log(0);
    process.exit();
  }

  let queue = [];
  let top = -1, rear = -1;
  queue[++rear] = n;
  visited[n] = 1;

  const isInRange = (num) => {
    return 0 <= num && num <= 100000;
  };
  
  while (top !== rear) {
    const current = queue[++top];
    const num = visited[current];

    if (isInRange(current + 1) && !visited[current + 1]) {
      visited[current + 1] = num + 1;
      queue[++rear] = current + 1;
    }
    if (isInRange(current - 1) && !visited[current - 1]) {
      visited[current - 1] = num + 1;
      queue[++rear] = current - 1;
    }
    if (isInRange(current * 2) && !visited[current * 2]) {
      visited[current * 2] = num + 1;
      queue[++rear] = current * 2;
    }
  }

  console.log(visited[k] - 1);

  process.exit();
});
