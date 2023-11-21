const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  const memoization = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

  if (input > 1) {
    for (let i = 1; i < input; i++) {
      const newArr = new Array(10);
      memoization.push(newArr);
    }

    let num = 1;
    while (num < input) {
      for (let i = 0; i < 10; i++) {
        let value = 0;
        memoization[num - 1].slice(0, i + 1).forEach((el) => value += el);
        memoization[num][i] = value % 10007;
      }
      num++;
    }
  }

  let result = 0;
  memoization[input - 1].forEach((el) => result += el);
  console.log(result % 10007);

  process.exit();
});
