const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  const edgesInfo = new Array(n + 1).fill(0);
  let answer = [];

  const adjacencyList = {};
  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  const addEdges = (arr, length) => {
    for (let idx = 0; idx < length - 1; idx++) {
      adjacencyList[arr[idx]].push(arr[idx + 1]);
      edgesInfo[arr[idx + 1]]++;
    }
  };

  for (let i = 0; i < m; i++) {
    addEdges(input[i].slice(1), input[i][0]);
  }

  const queue = [];
  for (let i = 1; i < n + 1; i++) {
    if (edgesInfo[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const v = queue.shift();
    adjacencyList[v].forEach(neighbor => {
      edgesInfo[neighbor]--;

      if (edgesInfo[neighbor] === 0) queue.push(neighbor);
    });

    answer.push(v);
  }

  if (answer.length !== n) {
    console.log(0);
    process.exit();
  }

  console.log(answer.join('\n').trimEnd());
  process.exit();
});
