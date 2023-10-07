const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";

const getAverage = (arr, n) => {
  let sum = 0;
  for (el of arr) {
    sum += el;
  }
  const average = sum / n;
  let value = average.toFixed();

  if (value.toString() === "-0") value = 0;
  answer += `${value}\n`;
};

const getCenter = (sortedArr, n) => {
  const centerIdx = Math.floor(sortedArr.length / 2);

  answer += `${sortedArr[centerIdx]}\n`;
};

const getMode = (sortedArr) => {
  const map = new Map();
  for (el of sortedArr) {
    const value = map.get(el);
    if (value != null) {
      map.set(el, value + 1);
    } else map.set(el, 1);
  }
  const max = Math.max(...Array.from(map.values()));
  let maxArr = [];

  for (let key of map.keys()) {
    if (map.get(key) === max) maxArr.push(key);
  }

  if (maxArr.length === 1) {
    answer += `${maxArr[0]}\n`;
  } else answer += `${maxArr[1]}\n`;
};

const getRange = (sortedArr) => {
  answer += `${sortedArr[sortedArr.length - 1] - sortedArr[0]}`;
};

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  const N = input[0];
  const numArr = input.slice(1);
  const sortedArr = input.slice(1).sort(function (a, b) {
    return a - b;
  });

  getAverage(numArr, N);
  getCenter(sortedArr, N);
  getMode(sortedArr);
  getRange(sortedArr);

  console.log(answer);

  process.exit();
});
