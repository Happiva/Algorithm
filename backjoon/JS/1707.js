const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [testCase] = input.shift();
  let answer = '';

  const bfs = (v, e) => {
    const adjacencyList = {};
    let isBipartiteGraph = true;

    for (let i = 1; i <= v; i++) {
      adjacencyList[i] = [];
    }

    for (let i = 0; i < e; i++) {
      const [v1, v2] = input[i];
      adjacencyList[v1].push(v2);
      adjacencyList[v2].push(v1);
    }
    const visited = {};

    for (let i = 1; i <= v; i++) {
      if (visited[i] == null) {
        let queue = [i];
        visited[i] = 1;

        while (queue.length) {
          const current = queue.shift();
          const color = (visited[current] % 2) + 1;

          adjacencyList[current].forEach((neighbor) => {
            if (visited[neighbor] != null && visited[neighbor] !== color) {
              isBipartiteGraph = false;
              return isBipartiteGraph;
            }

            if (visited[neighbor] == null) {
              queue.push(neighbor);
              visited[neighbor] = color;
            }
          });
        }   
      }
    }

    return isBipartiteGraph;
  };

  for (let t = 0; t < testCase; t++) {
    const [v, e] = input.shift();

    const result = bfs(v, e);
    answer += result ? 'YES\n' : 'NO\n';

    input.splice(0, e);
  }

  console.log(answer.trimEnd());
  process.exit();
});
