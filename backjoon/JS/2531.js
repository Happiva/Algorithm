const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  // 접시 수, 초밥 가짓 수, 연속 초밥 수, 쿠폰 번호
  const [n, d, k, c] = input.shift().split(' ').map((el) => parseInt(el));
  const belt = input.map((el) => parseInt(el));

  let left = 0, right;
  let obj = {};
  let max = 0;

  const compareMax = () => {
    const currentSushi = Object.keys(obj);
    const num = obj[c] != null ? currentSushi.length : currentSushi.length + 1;

    max = Math.max(num, max);
  };

  for (right = 0; right < k; right++) {
    obj[belt[right]] = obj[belt[right]] != null ? obj[belt[right]] + 1 : 1;
  }
  compareMax();

  // left랑 right를 이동시켜가며 윈도우 내 원소 갱신
  while (left < n) {
    obj[belt[left]]--;
    if (obj[belt[left]] === 0) delete obj[belt[left]];

    left++;

    obj[belt[right]] = obj[belt[right]] != null ? obj[belt[right]] + 1 : 1;
    right = (right + 1) % n;

    compareMax();
  }

  console.log(max);
  
  process.exit();
});
