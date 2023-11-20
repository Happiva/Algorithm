const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
let memoization = new Array(1000001);
memoization[1] = 0;

let orderArr = new Array(1000001);
orderArr[0] = 0;
orderArr[1] = 0;

const DP = (num) => {
  if (memoization[num] != null) return memoization[num];

  let min = [Infinity, 0];
  let prev;

  if (num % 3 === 0) {
    prev = DP(num / 3);
    if (prev < min[0]) {
      min[0] = prev;
      min[1] = num / 3;
    }
  }

  if (num % 2 === 0) {
    prev = DP(num / 2);
    if (prev < min[0]) {
      min[0] = prev;
      min[1] = num / 2;
    }
  }

  prev = DP(num - 1);
  if (prev < min[0]) {
    min[0] = prev;
    min[1] = num - 1;
  }

  memoization[num] = min[0] + 1;
  orderArr[num] = min[1];

  return memoization[num];
};

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  const result = DP(input);
  let num = input;
  let order = '';

  while (num > 0) {
    order += num + ' ';
    num = orderArr[num];
  }

  console.log(result);
  console.log(order.trim());

  process.exit();
});
