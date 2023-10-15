const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";
let array;

const binarySearch = (start, end, num) => {
  if (num < array[start] || num > array[end]) {
    // 범위 안에 존재하지 않을 것
    answer += "0\n";
  } else {
    const mid = Math.floor((start + end) / 2);

    if (array[mid] === num) answer += "1\n";
    else if (array[mid] < num) {
      binarySearch(mid + 1, end, num);
    } else if (array[mid] > num) {
      binarySearch(start, mid - 1, num);
    }
  }
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  array = input[1].sort((a, b) => a - b);
  const numArr = input[3];

  for (let i = 0; i < numArr.length; i++) {
    binarySearch(0, array.length - 1, numArr[i]);
  }
  console.log(answer);

  process.exit();
});
