const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  const arr = input.shift();

  let start = 1, end = n * 10000;
  let answer = Infinity;

  const checkBluerayCapacity = (capacity) => {
    let currentCap = 0, totalBlueray = 0;
    for (let i = 0; i < n; i++) {
      if (capacity < arr[i]) {
        return false;
      }

      if (currentCap + arr[i] > capacity) {
        totalBlueray++;
        currentCap = 0;
      }
      currentCap += arr[i];

      if (totalBlueray > m) break;
    }
    totalBlueray += 1;

    if (totalBlueray <= m) return true;
    else return false;
  };

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (checkBluerayCapacity(mid)) {
      answer = Math.min(answer, mid);
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  console.log(answer);
  process.exit();
});
