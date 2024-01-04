const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input.shift();
  const kit = input.shift();
  let answer = 0;

  const visited = new Array(n).fill(false);
  let weight = 500;

  const backtrack = (num) => {
    for (let i = 0; i < n; i++) {
      if (!visited[i] && weight + kit[i] - k >= 500) {
        num++;

        if (num === n) {
          answer++;
        } else {
          visited[i] = true;
          weight = weight + kit[i] - k;
          backtrack(num);
          num--;
          weight = weight + k - kit[i];
          visited[i] = false;
        }
      }
    }
  };

  backtrack(0);
  console.log(answer);

  process.exit();
});
