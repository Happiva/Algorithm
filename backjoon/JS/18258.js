const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";

const MAX_QUEUE_SIZE = 2000000;

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  let queue = new Array(MAX_QUEUE_SIZE);
  let first = -1;
  let rear = -1;
  let num = 0;

  const push = (x) => {
    if (rear !== MAX_QUEUE_SIZE - 1) {
      queue[++rear] = x;
      num++;
    }
  };

  const pop = () => {
    if (first === rear) {
      answer += "-1\n";
    } else {
      answer += `${queue[++first]}\n`;
      num--;
    }
  };

  const size = () => {
    answer += `${num}\n`;
  };

  const empty = () => {
    if (first === rear) answer += "1\n";
    else answer += "0\n";
  };

  const front = () => {
    if (first === rear) answer += "-1\n";
    else answer += `${queue[first + 1]}\n`;
  };

  const back = () => {
    if (first === rear) answer += "-1\n";
    else answer += `${queue[rear]}\n`;
  };

  for (let i = 1; i < input.length; i++) {
    const command = input[i][0];

    switch (command) {
      case "push":
        push(parseInt(input[i][1]));
        break;
      case "pop":
        pop();
        break;
      case "size":
        size();
        break;
      case "empty":
        empty();
        break;
      case "front":
        front();
        break;
      case "back":
        back();
        break;
    }
  }
  console.log(answer.trimEnd());

  process.exit();
});
