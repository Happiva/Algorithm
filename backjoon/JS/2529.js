const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const k = parseInt(input.shift());
  const signArr = input[0].split(' ');
  let min = Infinity, max = -Infinity;

  const visited = new Array(10).fill(false);
  
  const backtrack = (num, prev, str) => {
    if (num === k) {
      const result = parseInt(str);

      min = Math.min(min, result);
      max = Math.max(max, result);
      
      return;
    }

    for (let i = 0; i < 10; i++) {
      if (!visited[i]) {
        if (
          (signArr[num] === "<" && prev < i) ||
          (signArr[num] === ">" && prev > i)
        ) {
          visited[i] = true;
          backtrack(num + 1, i, str + i);
          visited[i] = false;
        }
      }
    }
  };

  for (let j = 0; j < 10; j++) {
    visited[j] = true;
    backtrack(0, j, '' + j);
    visited[j] = false;
  }

  console.log(String(max).padStart(k + 1, '0'));
  console.log(String(min).padStart(k + 1, '0'));

  process.exit();
});
