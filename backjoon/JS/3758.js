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
  let answer = [];

  for (let i = 0; i < testcase; i++) {
    const [n, k, t, m] = input.shift().split(' ').map((el) => parseInt(el));
    const logs = input.splice(0, m);

    const record = new Array(n + 1); // 마지막 제출시간, 제출횟수, 최종 점수
    const totalScore = new Array(n + 1);
    for (let j = 0; j < n + 1; j++) {
      record[j] = [0, 0];
      totalScore[j] = new Array(k).fill(0);
    }

    logs.forEach((log, index) => {
      const [id, qid, score] = log.split(' ').map((el) => parseInt(el));
      totalScore[id][qid - 1] = Math.max(totalScore[id][qid - 1], score);
      record[id][1]++;
      record[id][0] = index;
    });
    
    totalScore.forEach((arr, index) => {
      let total = 0;
      arr.forEach((el) => total += el);
      record[index][2] = total;
      record[index][3] = index;
    });
    
    record.shift();
    record.sort((a, b) => {
      if (a[2] === b[2]) {
        if (a[1] === b[1]) {
          return a[0] < b[0] ? -1 : 1;
        }

        return a[1] < b[1] ? -1 : 1;
      }

      return a[2] > b[2] ? -1 : 1;
    });

    record.forEach((arr, index) => {
      if (arr[3] === t) answer.push(index + 1);
    });
  }

  console.log(answer.join('\n').trim());
  
  process.exit();
});
