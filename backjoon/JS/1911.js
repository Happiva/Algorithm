const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, l] = input.shift(); // 물웅덩이 개수, 널빤지 길이
  let answer = 0;
  let current = 0;
  let distance, num;
  const sortedArr = input.sort((arr1, arr2) => arr1[0] - arr2[0]);

  for (let i = 0; i < n; i++) {
    const [start, end] = sortedArr[i];

    if (current >= end) continue;

    distance = end - Math.max(start, current);
    num = Math.ceil(distance / l);

    current = Math.max(start, current) + l * num;
    answer += num;
  }

  console.log(answer);
  process.exit();
});
