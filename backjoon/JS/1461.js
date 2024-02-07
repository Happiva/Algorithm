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
  let answer = 0;
  const sortedArr = input[0].sort((a, b) => a - b);
  const minusArr = sortedArr.filter((el) => el < 0);
  const plusArr = sortedArr.filter((el) => el > 0).sort((a, b) => b - a);

  if (n === 1) {
    console.log(sortedArr[0]);
    process.exit();
  }

  if ((plusArr.length > 0 && minusArr.length === 0) || plusArr[0] > Math.abs(minusArr[0])) {
    const distance = plusArr.splice(0, m);
    answer += distance[0];
  } else if (
    (minusArr.length > 0 && plusArr.length === 0) ||
    plusArr[0] < Math.abs(minusArr[0])
  ) {
    const distance = minusArr.splice(0, m);
    answer += Math.abs(distance[0]);
  }

  if (plusArr.length) {
    for (let i = 0; i < plusArr.length; i += m) {
      answer += plusArr[i] * 2;
    }
  }
  
  if (minusArr.length) {
    for (let i = 0; i < minusArr.length; i += m) {
      answer += Math.abs(minusArr[i]) * 2;
    }
  }

  console.log(answer);
  process.exit();
});
