const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on("close", function () {
  const n = parseInt(input.shift());
  let answer = 0;

  const sortedArr = input.map((arr) => {
    const [startMonth, startDay, endMonth, endDay] = arr;
    return [startMonth * 100 + startDay, endMonth * 100 + endDay];
  }).sort((arr1, arr2) => {
    const [start1, end1] = arr1;
    const [start2, end2] = arr2;
    if (start1 === start2) return end2 - end1;
    return start1 - start2;
  });

  const end = 1201;
  let currentStart = 301, max = 0;
  let idx = 0, isFlower = false;
  
  while (currentStart < end) {
    isFlower = false;
    
    for (let i = idx; i < n; i++) {
      const [startDay, endDay] = sortedArr[i];
      if (startDay > currentStart) break;
      if (max < endDay) {
        max = endDay;
        idx++;
        isFlower = true;
      }
    }

    if (isFlower) {
      currentStart = max;
      answer++;
    } else break;
  }

  if (max < end) {
    console.log(0);
  } else console.log(answer);

  process.exit();
});
