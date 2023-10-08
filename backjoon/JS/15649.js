const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let answer = "";
const str = [];
const visited = new Array(n);
visited.fill(0);

const backTrack = (num) => {
  if (num === m) {
    answer += `${str.join(" ")}\n`;
  } // 이 구문을 for문 안에 처리 + 백트랙 실행코드를 else로 묶어서 다음 루프가 실행안된듯...

  for (let i = 0; i < n; i++) {
    if (visited[i] === 0 || !visited[i]) {
      str.push(i + 1);
      visited[i] = 1;

      backTrack(num + 1);
      visited[i] = 0;
      str.pop();
    }
  }
};

rl.on("line", (line) => {
  [n, m] = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  backTrack(0);

  console.log(answer.trim());

  process.exit();
});
