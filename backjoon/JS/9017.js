const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const testcase = parseInt(input.shift());
  const answer = [];

  for (let t = 0; t < testcase; t++) {
    const n = parseInt(input.shift());
    const rankArr = input.shift().split(' ').map((el) => parseInt(el));
    const obj = {};
    let winners = [], min = Infinity;

    const arr = new Array(201);
    for (let i = 0; i < arr.length; i++) {
      let newArr = [0, 0, 0];
      arr[i] = newArr;
    }

    rankArr.forEach((team) => {
      obj[team] = obj[team] != null ? obj[team] + 1 : 1;
    });
    let score = 1;
    for (let i = 0; i < rankArr.length; i++) {
      if (obj[rankArr[i]] >= 6) {
        arr[rankArr[i]][1]++;
        if (arr[rankArr[i]][1] < 5) arr[rankArr[i]][0] += score;
        if (arr[rankArr[i]][1] === 5) arr[rankArr[i]][2] = score;
        score++;
      }
    }

    arr.forEach((info, index) => {
      const score = info[0];
      if (score === 0) return;
      if (score < min) winners = [index];
      else if (score === min) winners.push(index);
      min = Math.min(score, min);
    });
    if (winners.length > 1) {
      winners.sort((a, b) => arr[a][2] - arr[b][2]);
    }
    answer.push(winners[0]);
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
