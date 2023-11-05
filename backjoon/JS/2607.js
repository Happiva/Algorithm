const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const getObjFromWord = (word) => {
  let obj = {};
  for (el of word) {
    obj[el] = obj[el] != null ? obj[el] + 1 : 1;
  }
  return obj;
};

const checkForSimilarity = (obj1, obj2) => {
  const a = JSON.parse(JSON.stringify(obj1));
  const b = JSON.parse(JSON.stringify(obj2));
  const sliceArr = Object.keys(obj1);
  for (slice of sliceArr) {
    if (b[slice] != null) {
      if (a[slice] === b[slice]) {
        a[slice] = 0;
        b[slice] = 0;
      } else if (a[slice] > b[slice]) {
        a[slice] -= b[slice];
        b[slice] = 0;
      } else if (a[slice] < b[slice]) {
        b[slice] -= a[slice];
        a[slice] = 0;
      }
    }
  }
  let difference = 0;
  for (el of Object.keys(a)) {
    difference += a[el];
  }
  for (el of Object.keys(b)) {
    difference += b[el];
  }

  if (difference <= 1) return true;
  else if (difference === 2) {
    if (Object.values(a).includes(2) || Object.values(b).includes(2)) {
      return false;
    } else if (
      Math.max(...Object.values(a)) === 0 ||
      Math.max(...Object.values(b)) === 0
    ) {
      return false;
    } else return true;
  } else return false;
};

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const first = input[1];
  const firstObj = getObjFromWord(first);
  let answer = 0;

  for (let i = 2; i < input.length; i++) {
    const wordObj = getObjFromWord(input[i]);
    if (checkForSimilarity(firstObj, wordObj)) answer++;
  }
  console.log(answer);
  process.exit();
});
