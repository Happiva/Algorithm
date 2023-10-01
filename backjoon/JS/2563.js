const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  let area = 0;
  let array = new Array(100);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(100);
  }

  for (let i = 1; i < input.length; i++) {
    const x = input[i][0];
    const y = input[i][1];

    for (let j = x; j < x + 10; j++) {
      for (let z = y; z < y + 10; z++) {
        if (array[j][z] == null) {
          area++;
          array[j][z] = 1;
        }
      }
    }
  }

  console.log(area);

  process.exit();
});
