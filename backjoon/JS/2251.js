const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [a, b, c] = input;
  const answer = new Set();

  const visited = new Array(a + 1);
  for (let i = 0; i < a + 1; i++) {
    visited[i] = new Array(b + 1);
    for (let j = 0; j < b + 1; j++) {
      visited[i][j] = new Array(c + 1).fill(false);
    }
  }

  let queue = [[0, 0, c]];

  while (queue.length > 0) {
    let [currentA, currentB, currentC] = queue.shift();

    if (visited[currentA][currentB][currentC]) continue;
    else visited[currentA][currentB][currentC] = true;

    if (currentA === 0) answer.add(currentC);

    if (currentA > 0) {
      if (currentA + currentB <= b) {
        queue.push([0, currentA + currentB, currentC]);
      } else {
        queue.push([currentA + currentB - b, b, currentC]);
      }
      
      if (currentA + currentC <= c) {
        queue.push([0, currentB, currentC + currentA]);
      } else {
        queue.push([currentA + currentC - c, currentB, c]);
      }
    }
    if (currentB > 0) {
      if (currentA + currentB <= a) {
        queue.push([currentA + currentB, 0, currentC]);
      } else {
        queue.push([a, currentA + currentB - a, currentC]);
      }

      if (currentB + currentC <= c) {
        queue.push([currentA, 0, currentC + currentB]);
      } else {
        queue.push([currentA, currentB + currentC - c, c]);
      }
    }
    if (currentC > 0) {
      if (currentA + currentC <= a) {
        queue.push([currentA + currentC, currentB, 0]);
      } else {
        queue.push([a, currentB, currentC + currentA - a]);
      }

      if (currentB + currentC <= b) {
        queue.push([currentA, currentB + currentC, 0]);
      } else {
        queue.push([currentA, b, currentB + currentC - b]);
      }
    }
  }

  console.log(Array.from(answer).sort((a, b) => a - b).join(' ').trim());
  process.exit();
});
