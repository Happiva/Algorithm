const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [col, row] = input.shift();

  const n = input.shift();
  const arr = [];

  const getVertex = (dir, distance) => {
    if (dir === 1) {
      return [0, distance, dir];
    }
    if (dir === 2) {
      return [row, distance, dir];
    }
    if (dir === 3) {
      return [distance, 0, dir];
    }
    if (dir === 4) {
      return [distance, col, dir];
    }
  };

  for (let i = 0; i < n; i++) {
    const [dir, distance] = input[i];

    arr.push(getVertex(dir, distance));
  }

  const [x, y, direction] = getVertex(...input[input.length - 1]);

  let result = 0;
  const totalDistance = 2 * (col + row);

  for (let i = 0; i < n; i++) {
    const [shopX, shopY, shopDir] = arr[i];

    if (shopDir === direction) {
      result += Math.abs(shopX - x) + Math.abs(shopY - y);
    } else if (shopDir + direction < 7 && shopDir + direction > 3) {
      result += Math.abs(shopX - x) + Math.abs(shopY - y);
    } else {
      let tempDis;

      if (shopDir === 1 || direction === 1) {
        tempDis = row + (col - shopY) + (col - y);
      } else {
        tempDis = col + (row - shopX) + (row - x);
      }
      if (tempDis < totalDistance / 2) result += tempDis;
      else result += totalDistance - tempDis;
    }
  }

  console.log(result);

  process.exit();
});
