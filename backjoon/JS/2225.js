const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(' ');
}).on("close", function () {
  const [n, k] = input.map((el) => parseInt(el));
  const arr = new Array(k + 1);
  for (let i = 0; i < arr.length; i++) {
    const newArr = new Array(n + 1);
    if (i === 0) newArr.fill(0);
    if (i === 1) newArr.fill(1);
    if (i === 2) {
      for (let j = 0; j < newArr.length; j++) newArr[j] = j + 1;
    }
    arr[i] = newArr;
  }
  for (let i = 1; i < arr.length; i++) {
    arr[i][0] = 1;
  }

  if (k > 2) {
    for (let i = 3; i < arr.length; i++) {
      for (let j = 1; j < n + 1; j++) {
        arr[i][j] = (arr[i - 1][j] + arr[i][j - 1]) % 1000000000;
      }
    }
  }

  console.log(arr[k][n] % 1000000000);

  process.exit();
});
