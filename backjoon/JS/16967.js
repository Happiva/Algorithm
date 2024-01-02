const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [h, w, x, y] = input.shift();
  const arrB = input;

  const arrA = new Array(h);
  for (let i = 0; i < h; i++) {
    arrA[i] = new Array(w).fill(0);
  }

  const isInA = (row, col) => {
    return row >= 0 && row < h && col >= 0 && col < w;
  };

  const isInMovedA = (row, col) => {
    return row >= x && row < h + x && col >= y && col < w + y;
  };

  for (let i = 0; i < h + x; i++) {
    for (let j = 0; j < w + y; j++) {
      if (isInA(i, j) && !isInMovedA(i, j)) {
        arrA[i][j] = input[i][j];
      }

      if (!isInA(i, j) && isInMovedA(i, j)) {
        arrA[i - x][j - y] = input[i][j];
      }
    }
  }

  for (let i = x; i < h; i++) {
    for (let j = y; j < w; j++) {
      arrA[i][j] = input[i][j] - arrA[i - x][j - y];
    }
  }

  let answer = "";
  arrA.forEach((arr) => (answer += arr.join(" ") + "\n"));

  console.log(answer.trim());

  process.exit();
});
