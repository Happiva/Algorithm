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
  let arr = [];
  let answer = 0, num = 0;

  for (let i = 0; i < n; i++) {
    const [start, end] = input[i];
    arr.push({ time: start, isStart: 1 });
    arr.push({ time: end, isStart: -1 });
  }

  const sortedArr = arr.sort((a, b) => {
    if (a.time === b.time) {
      return a.isStart - b.isStart;
    }
    return a.time - b.time;
  });

  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i].isStart === 1) {
      num++;
    } else num--;
    answer = Math.max(num, answer);
  }
  
  console.log(answer);
  process.exit();
});
