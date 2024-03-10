const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [t] = input.shift();
  let answer = '';
  for (let i = 0; i < t; i++) {
    const [n] = input.shift();
    const adjacencyList = {};
    for (let j = 0; j < n + 2; j++) {
      adjacencyList[j] = [];
    }

    for (let j = 0; j < n + 2; j++) {
      for (let k = j; k < n + 2; k++) {
        if (j === k) continue;
        if (Math.abs(input[j][0] - input[k][0]) + Math.abs(input[j][1] - input[k][1]) <= 1000) {
          adjacencyList[j].push(k);
          adjacencyList[k].push(j);
        }
      }
    }
    
    let queue = [0];
    let visited = new Array(n + 2).fill(false);
    visited[0] = true;
    let isArrived = false;

    while (queue.length) {
      const current = queue.shift();
      if (current === n + 1) {
        isArrived = true;
        break;
      }

      adjacencyList[current].forEach((neighbor) => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
    answer += isArrived ? 'happy\n' : 'sad\n';
    input.splice(0, n + 2);
  }

  console.log(answer.trimEnd());
  process.exit();
});
