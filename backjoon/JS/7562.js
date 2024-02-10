const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextCol = [-2, -1, 1, 2, 2, 1, -1, -2];
const nextRow = [1, 2, 2, 1, -1, -2, -2, -1];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [testCase] = input.shift();
  const answer = [];

  const isInRange = (x, y, size) => {
    return 0 <= x && 0 <= y && x < size && y < size;
  };

  for (let i = 0; i < testCase; i++) {
    const [size] = input[0];
    const [startX, startY] = input[1];
    const [targetX, targetY] = input[2];

    if (startX === targetX && startY === targetY) {
      answer.push(0);
      input.splice(0, 3);
      continue;
    }

    const visited = new Array(size);
    for (let j = 0; j < size; j++) visited[j] = new Array(size).fill(0);

    let queue = [[startX, startY, 0]];
    visited[startX][startY] = 1;

    while (queue.length > 0) {
      const [currentX, currentY, num] = queue.shift();

      for (let k = 0; k < 8; k++) {
        const nextX = nextCol[k] + currentX;
        const nextY = nextRow[k] + currentY;

        if (isInRange(nextX, nextY, size) && visited[nextX][nextY] === 0) {
          visited[nextX][nextY] = num + 1;
          if (nextX === targetX && nextY === targetY) {
            break;
          }

          queue.push([nextX, nextY, num + 1]);
        }
      }
    }
    answer.push(visited[targetX][targetY]);
    input.splice(0, 3);
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
