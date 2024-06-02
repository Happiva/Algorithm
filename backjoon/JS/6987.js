const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  let answer = new Array(4).fill(0);
  const match = [];
  for (let i = 0; i < 6; i++) {
    for (let j = i + 1; j < 6; j++) {
      match.push([i, j]);
    }
  }

  const search = (arr, num, caseNum) => {
    if (num === 15) {
      let result = true;
      for (let i = 0; i < 6; i++) {
        if (!result) break;
        for (let j = 0; j < 3; j++) {
          if (arr[i][j] !== 0) {
            result = false;
          }
        }
      }

      answer[caseNum] = result ? 1 : 0;
      return;
    }

    const [t1, t2] = match[num];

    if (arr[t1][0] > 0 && arr[t2][2] > 0) {
      arr[t1][0]--;
      arr[t2][2]--;
      search(arr, num + 1, caseNum);
      arr[t1][0]++;
      arr[t2][2]++;
    }

    if (arr[t1][1] > 0 && arr[t2][1] > 0) {
      arr[t1][1]--;
      arr[t2][1]--;
      search(arr, num + 1, caseNum);
      arr[t1][1]++;
      arr[t2][1]++;
    }

    if (arr[t1][2] > 0 && arr[t2][0] > 0) {
      arr[t1][2]--;
      arr[t2][0]--;
      search(arr, num + 1, caseNum);
      arr[t1][2]++;
      arr[t2][0]++;
    }
  };

  for (let i = 0; i < input.length; i++) {
    const resultArr = [];
    for (let j = 0; j < 6; j++) {
      let start = j * 3;
      resultArr.push(input[i].slice(start, start + 3));
    }

    search(resultArr, 0, i);
  }

  console.log(answer.join(' ').trimEnd());
  process.exit();
});
