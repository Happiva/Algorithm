const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = [];

const evaluate = (queue, targetIdx) => {
  const orderQueue = [];
  const sortedArr = [...queue].sort((a, b) => a - b);
  for (idx in queue) {
    orderQueue.push({ idx: parseInt(idx), priority: queue[idx] });
  }
  let front = -1;
  let rear = sortedArr.length - 1;

  const push = (el) => {
    orderQueue[++rear] = el;
  };

  const pop = () => {
    if (front === rear) return;
    return orderQueue[++front];
  };
  let num = 0;

  while (sortedArr.length > 0) {
    if (orderQueue[front + 1].priority === sortedArr[sortedArr.length - 1]) {
      sortedArr.pop();
      const el = pop();
      num++;
      if (el.idx === targetIdx) {
        answer.push(num);
        break;
      }
    } else {
      const el = pop();
      push(el);
    }
  }
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const testCase = input[0][0];
  for (let i = 0; i < testCase; i++) {
    const [n, m] = input[(i + 1) * 2 - 1];
    if (n === 1) {
      answer.push(1);
      continue;
    }
    const queue = input[(i + 1) * 2];
    evaluate(queue, m);
  }

  console.log(answer.join("\n"));
  process.exit();
});
