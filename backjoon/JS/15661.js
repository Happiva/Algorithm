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
  let answer = Infinity;
  let visited = new Array(n);

  const makeTeam = (current, target, start) => {
    if (current === target) {
      let startStat = 0;
      let linkStat = 0;

      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          if (i !== j) {
            if (visited[i] && visited[j])
              startStat += input[i][j] + input[j][i];
            if (!visited[i] && !visited[j])
              linkStat += input[i][j] + input[j][i];
          }
        }
      }

      answer = Math.min(answer, Math.abs(startStat - linkStat));
      return;
    }

    for (let i = start; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        makeTeam(current + 1, target, i + 1);
        visited[i] = false;
      }
    }
  };

  for (let p = 1; p <= Math.floor(n / 2); p++) {
    visited.fill(false);

    makeTeam(0, p, 0);
  }

  console.log(answer);
  process.exit();
});
