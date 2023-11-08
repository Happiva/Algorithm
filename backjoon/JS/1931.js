const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on("close", function () {
  const schedule = input.slice(1).sort((arr1, arr2) => {
    if (arr1[1] === arr2[1]) {
      return arr1[0] - arr2[0];
    }
    return arr1[1] - arr2[1];
  });
  let num = 1;
  let current = schedule[0];

  for (let i = 1; i < schedule.length; i++) {
    if (current[1] <= schedule[i][0]) {
      num++;
      current = schedule[i];
    }
  }
  console.log(num);
  process.exit();
});
