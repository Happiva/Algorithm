const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const n = input.shift();
  const arr = [0, ...input];
  let visited = new Array(n + 1).fill(false);
  let isLoop = false;
  let set = new Set();

  const dfs = (start, current) => {
    if (visited[current]) {
      if (start === current) {
        isLoop = true;
        set.add(current);
      }

      return;
    }

    visited[current] = true;
    dfs(start, arr[current]);

    if (isLoop) {
      set.add(current);
      set.add(arr[current]);
    }
  };

  for (let i = 1; i <= n; i++) {
    visited[i] = true;
    dfs(i, arr[i]);

    isLoop = false;
    visited.fill(false);
  }
  const answer = Array.from(set).sort((a, b) => a - b);
  console.log(answer.length);
  console.log(answer.join('\n').trimEnd());

  process.exit();
});
