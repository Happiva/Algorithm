const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m, k] = input.shift();
  let answer = Infinity;
  const origin = input.splice(0, n);
  let visited = new Array(k).fill(false);

  const rotateArr = (r, c, s, arr) => {
    const start = [r - s - 1, c - s - 1];
    const end = [r + s - 1, c + s - 1];
    const newArr = arr.map((el) => [...el]);

    let left, temp, length = 2 * s;
    for (let i = 0; i < s; i++) {
      const startPos = { x: start[0] + i, y: start[1] + i };
      const endPos = { x: end[0] - i, y: end[1] - i };

      left = newArr[startPos.x + 1][startPos.y];
      for (let j = startPos.y; j < startPos.y + length; j++) {
        temp = left;
        left = newArr[startPos.x][j];
        newArr[startPos.x][j] = temp;
      }

      for (let j = startPos.x; j < endPos.x; j++) {
        temp = left;
        left = newArr[j][startPos.y + length];
        newArr[j][startPos.y + length] = temp;
      }

      for (let j = endPos.y; j > endPos.y - length; j--) {
        temp = left;
        left = newArr[endPos.x][j];
        newArr[endPos.x][j] = temp;
      }

      for (let j = endPos.x; j > startPos.x; j--) {
        temp = left;
        left = newArr[j][startPos.y];
        newArr[j][startPos.y] = temp;
      }

      length -= 2;
    }

    return newArr;
  };

  const calculateRow = (arr) => {
    let min = Infinity;
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum = 0;
      for (let j = 0; j < m; j++) {
        sum += arr[i][j];
      }
      min = Math.min(sum, min);
    }

    return min;
  };

  const search = (arr, num) => {
    if (num === k) {
      answer = Math.min(answer, calculateRow(arr));

      return;
    }

    for (let idx = 0; idx < k; idx++) {
      if (!visited[idx]) {
        visited[idx] = true;
        const newArr = rotateArr(...input[idx], arr);
        search(newArr, num + 1);
        visited[idx] = false;
      }
    }
  };
  
  search(origin, 0);

  console.log(answer);
  process.exit();
});
