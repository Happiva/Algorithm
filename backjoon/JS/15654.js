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
  const arr = input[0].sort((a, b) => a - b);
  let answer = '';
  const visited = new Array(n).fill(false);
  
  const backtrack = (num, ans) => {
    if (num === m) {
      answer += ans.join(' ');
      answer += '\n';
    } else if (num < m) {
      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          visited[i] = true;
          backtrack(num + 1, [...ans, arr[i]]);          
          visited[i] = false;
        }
      }
    }
  };

  backtrack(0, []);

  console.log(answer.trim());

  process.exit();
});
