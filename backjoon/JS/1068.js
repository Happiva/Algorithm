const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const adjacencyList = {};
  const removedNode = input[1][0];
  let answer = 0;

  let root;
  for (let i = 0; i < n; i++) adjacencyList[i] = [];

  for (let i = 0; i < n; i++) {
    if (input[0][i] === -1) {
      root = i;
    } else {
      const parent = input[0][i];
      adjacencyList[parent].push(i);
    }
  }

  if (root !== removedNode) {
    let stack = [root];
    const visited = {};
    while (stack.length > 0) {
      const current = stack.pop();
      visited[current] = true;
      let children = 0;

      adjacencyList[current].forEach((child) => {
        if (!visited[child] && child !== removedNode) {
          stack.push(child);
          children++;
        }
      });

      if (children === 0) answer++;
    }
  }

  console.log(answer);
  process.exit();
});
