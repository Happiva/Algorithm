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
  const set = new Set(input[0]);
  const arr = Array.from(set).sort((a, b) => a - b);
  const uniqueN = arr.length;

  let answer = '';

  const visited = new Array(m);
  for (let i = 0; i < visited.length; i++) visited[i] = new Array(uniqueN).fill(false);

  const backtrack = (num, prevIdx) => {
    if (num === m) {
      const temp = [];
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < uniqueN; j++) {
          if (visited[i][j]) {
            temp.push(arr[j]);
            continue;
          }
        }
      }
      answer += temp.join(' ') + '\n';
    } else if (num < m) {
      for (let i = prevIdx; i < uniqueN; i++) {
        visited[num][i] = true;
        backtrack(num + 1, i);
        visited[num][i] = false;
      }
    }
  };

  backtrack(0, 0);

  console.log(answer.trim());

  process.exit();
});
