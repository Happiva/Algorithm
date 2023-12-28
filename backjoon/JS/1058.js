const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());

  const adjacencyList = {};
  let max = 0;

  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === 'Y') {
        adjacencyList[i + 1].push(j + 1);
      }
    }
  }
  // 각 노드에서 거리가 2 이하인 정점 개수를 찾아야 함.
  for (let i = 1; i <= n; i++) {
    const queue = [[i, 0]]; // vertex, distance
    const visited = {};
    let num = 0;
    visited[i] = true;

    while (queue.length) {
      const [current, distance] = queue.shift();

      adjacencyList[current].forEach((v) => {
        if (!visited[v] && distance < 2) {
          visited[v] = true;
          queue.push([v, distance + 1]);
          num++;
        }
      });
    }
    max = Math.max(max, num);
  }

  console.log(max);

  process.exit();
});
