const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const next = [-1, 0, 1, 0];

rl.on("line", (line) => {
  input.push(line.split(""));
}).on("close", function () {
  let answer = 0;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < 12 && y < 6;
  };

  const breakPuyo = (arr) => {
    for (let el = 0; el < arr.length; el++) {
      const [x, y] = arr[el];
      input[x][y] = '.';
    }
  };

  const dropPuyo = () => {
    for (let col = 0; col < 6; col++) {
      let arr = [];
      for (let row = 11; row > -1; row--) {
        if (input[row][col] !== '.') {
          arr.push(input[row][col]);
          input[row][col] = '.';
        }
      }
      for (let row = 11; row > -1; row--) {
        if (arr.length === 0) break;
        const newPuyo = arr.shift();
        input[row][col] = newPuyo;
      }
    }
  };
    
  const findPuyo = (color, startX, startY) => {
    const queue = [[startX, startY]];
    let visited = Array.from(Array(12), () => Array(6).fill(false));
    visited[startX][startY] = true;
    let arr = [[startX, startY]];

    while (queue.length) {
      const [currentX, currentY] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nextX = currentX + next[i];
        const nextY = currentY + next[(i + 1) % 4];

        if (isInRange(nextX, nextY) && !visited[nextX][nextY] && input[nextX][nextY] === color) {
          arr.push([nextX, nextY]);
          visited[nextX][nextY] = true;
          queue.push([nextX, nextY]);
        }
      }
    }

    return arr;
  };

  while (true) {
    let isBroken = false;

    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 6; c++) {
        if (input[r][c] !== '.') {
          const colors = findPuyo(input[r][c], r, c);

          if (colors.length >= 4) {
            isBroken = true;
            breakPuyo(colors);
          }
        }
      }
    }
    if (isBroken) {
      answer++;
      dropPuyo();
    } else {
      break;
    }
  }
  
  console.log(answer);
  process.exit();
});
