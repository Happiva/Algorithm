const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const num = parseInt(input.shift());;
  const [openedDoor1, openedDoor2] = input.shift().split(' ').map((el) => parseInt(el));
  const memoization = [];
  const totalOrder = parseInt(input.shift());
  for (let i = 0; i < totalOrder; i++) {
    const newArr = new Array(num + 1);
    for (let j = 0; j < num + 1; j++) {
      newArr[j] = new Array(num + 1);
    }
    memoization.push(newArr);
  }

  const orderArr = input.map((el) => parseInt(el));

  const DP = (index, od1, od2) => {
    if (index >= totalOrder) return 0;
    const target = orderArr[index];

    memoization[index][od1][od2] = Math.min(
      Math.abs(target - od1) + DP(index + 1, target, od2),
      Math.abs(target - od2) + DP(index + 1, target, od1)
    );

    return memoization[index][od1][od2];
  }

  const answer = DP(0, openedDoor1, openedDoor2);

  console.log(answer);

  process.exit();
});
