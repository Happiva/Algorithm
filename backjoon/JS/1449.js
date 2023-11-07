const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
/*
  1. 구멍들의 배열을 정렬함(정렬되지 않아있을 가능성 있어서)
  2. 구멍을 막을 때 좌우 0.5씩 붙인단 것은 => 구멍 하나 당 1의 테이프가 필요하다는 뜻
  3. 테이프를 겹치는 것은 가능, 자르는 것은 안됨
  4. 가장 왼쪽에 있는 구멍부터 테이프를 하나씩 붙이기 시작해서, 배열을 한차례 순회하는 건?
*/
rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, length] = input[0];
  const holes = input[1].sort((a, b) => a - b);
  const arr = new Array(1001).fill(false);
  let num = 0;

  for (el of holes) {
    if (!arr[el]) {
      // 테이프가 안 붙여져 있을 경우
      for (let i = 0; i < length; i++) {
        arr[el + i] = true;
      }
      num++;
    }
  }
  console.log(num);

  process.exit();
});
