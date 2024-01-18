const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  let answer = 0;

  if (n === 1) {
    console.log(input[0][1]);
    process.exit();
  }
  
  let sortedArr = input.sort((arr1, arr2) => {
    if (arr1[0] === arr2[0]) {
      return arr2[1] - arr1[1];
    }
    return arr2[0] - arr1[0];
  });
  
  let day = sortedArr[0][0];
  while (day > 0) {
    let index = 0;
    let max = -Infinity;
    let isMaxAble = false;
    let maxIndex = 0;

    while (true) {
      if (day <= sortedArr[index][0]) {
        isMaxAble = true;
        max = Math.max(max, sortedArr[index][1]);

        if (max === sortedArr[index][1]) {
          maxIndex = index;
        }
      }

      if (day > sortedArr[index][0]) break;
      index++;

      if (sortedArr.length <= index) break;
    }
    if (isMaxAble) {
      answer += max;
      sortedArr.splice(maxIndex, 1);
    }

    if (sortedArr.length === 0) break;
    day--;
  }

  console.log(answer);

  process.exit();
});
