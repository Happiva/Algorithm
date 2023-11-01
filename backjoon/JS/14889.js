const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const stat = [];
const selected = [];
let star = []; // 선수들 번호가 들어가야댐
let link = [];
let minimum = Infinity;

const calculateStat = (team) => {
  let sum = 0;

  for (row of team) {
    for (col of team) {
      if (row !== col) {
        sum += stat[row - 1][col - 1];
      }
    }
  }
  return sum;
};

const backtrack = (num, n, idx) => {
  if (num === n / 2) {
    // star팀을 먼저 배정하고 나머지 인원은 link팀으로
    star = selected
      .map((el, index) => (el ? index + 1 : 0))
      .filter((el) => el !== 0);
    link = selected
      .map((el, index) => (!el ? index + 1 : 0))
      .filter((el) => el !== 0);

    starStat = calculateStat(star);
    linkStat = calculateStat(link);

    minimum = Math.min(Math.abs(starStat - linkStat), minimum);
    return;
  }

  for (let i = idx + 1; i < n; i++) {
    selected[i] = true;
    backtrack(num + 1, n, i);
    selected[i] = false;
  }
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  for (let i = 0; i < input[0][0]; i++) {
    selected.push(false);
  }
  for (let i = 1; i < input.length; i++) {
    stat.push(input[i]);
  }
  backtrack(0, input[0][0], -1);

  console.log(minimum);

  process.exit();
});
