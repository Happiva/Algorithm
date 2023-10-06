const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  let num = 0;
  let set = new Set();
  // ENTER 부터 다음 ENTER까지 그 안에 대화한 사람들을 Obj같은거에 넣어야함.
  // 다음 엔터때는 obj든 뭐든 비우고 다시 그 안에 사람을 채움
  // obj를 비울 때마다 그 안에 든 인사 횟수를 더함.

  for (let i = 2; i < input.length; i++) {
    if (input[i] === "ENTER") {
      num += set.size;
      set.clear();
    } else {
      set.add(input[i]);
    }
  }
  num += set.size;
  console.log(num);

  process.exit();
});
