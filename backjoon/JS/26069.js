const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  let obj = {
    ChongChong: "ChongChong",
  };

  // obj에 총총댄스를 추는 애들 이름을 집어넣음
  // 찾았을 때 한놈은 추고 한놈은 안추면 안추는 놈을 obj에 넣음
  // 한바퀴 다 돌고 obj의 key개수를 출력?

  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i];

    if (obj[a] != null || obj[b] != null) {
      obj[a] = a;
      obj[b] = b;
    }
  }
  console.log(Object.keys(obj).length);

  process.exit();
});
