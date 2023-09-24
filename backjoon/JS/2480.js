const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  if (x === y && y === z && z === x) {
    console.log(10000 + x * 1000);
  } else if (x !== y && y !== z && z !== x) {
    const max = x > y && x > z ? x : y > x && y > z ? y : z;
    console.log(max * 100);
  } else {
    const sameNum = x === y ? x : y === z ? y : z;
    console.log(sameNum * 100 + 1000);
  }

  process.exit();
});
