const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input.shift();

  if (n === k) {
    console.log(0);
    console.log(1);
    process.exit();
  }

  const visited = {};
  
  let queue = [];
  let top = -1, rear = -1, num = 0, min;
  queue[++rear] = n;
  visited[n] = 1;

  const isInRange = (current) => {
    return 0 <= current && current <= 100000;
  };

  while (top !== rear) {
    const current = queue[++top];
    const distance = visited[current];
    let next;

    if (min != null && min < distance) continue;

    for (let i = 0; i < 3; i++) {
      if (i === 0) next = current - 1;
      else if (i === 1) next = current + 1;
      else next = current * 2;

      if (next === k) {
        num++;
        min = distance;
      }

      if (isInRange(next) && (!visited[next] || distance + 1 === visited[next])) {
        queue[++rear] = next;
        visited[next] = distance + 1;
      }
    }
  }

  console.log(min);
  console.log(num);

  process.exit();
});
