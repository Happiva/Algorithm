const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n, m;
const noListenSet = new Set();
const noSeeSet = new Set();
let answer = "";

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  [n, m] = input[0].split(" ").map((el) => parseInt(el));

  for (let i = 1; i <= n; i++) {
    noListenSet.add(input[i]);
  }
  for (let j = n + 1; j < input.length; j++) {
    noSeeSet.add(input[j]);
  }

  const intersection = new Set(
    [...noListenSet].filter((el) => noSeeSet.has(el))
  );
  const intersectionArr = [...intersection].sort();
  answer += `${intersectionArr.length}\n${intersectionArr.join("\n")}`;

  console.log(answer);

  process.exit();
});
