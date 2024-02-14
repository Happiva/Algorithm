const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [
  [9, 3, 1],
  [9, 1, 3],
  [1, 9, 3],
  [1, 3, 9],
  [3, 1, 9],
  [3, 9, 1],
];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const arr = input[0].split(' ').map((el) => parseInt(el));
  const hpArr = Array.from([0, 0, 0], (el, idx) => arr[idx] ?? el);

  const visited = new Array(hpArr[0] + 1);

  for (let i = 0; i < hpArr[0] + 1; i++) {
    visited[i] = new Array(61);
    for (let j = 0; j < 61; j++) {
      visited[i][j] = new Array(61).fill(0);
    }
  }

  let queue = [[...hpArr]];
  visited[hpArr[0]][hpArr[1]][hpArr[2]] = 1;

  while (queue.length > 0) {
    const [a, b, c] = queue.shift();
    const num = visited[a][b][c];

    for (let i = 0; i < next.length; i++) {
      const nextA = Math.max(a - next[i][0], 0);
      const nextB = Math.max(b - next[i][1], 0);
      const nextC = Math.max(c - next[i][2], 0);

      if (!visited[nextA][nextB][nextC]) {
        visited[nextA][nextB][nextC] = num + 1;
        queue.push([nextA, nextB, nextC]);
      }
    }
  }
  console.log(visited[0][0][0] - 1);
  
  process.exit();
});
