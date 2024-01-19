const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const sortedArr = input.sort((arr1, arr2) => arr2[1] - arr1[1]);
  
  let time = sortedArr[0][1] - sortedArr[0][0];

  for (let i = 1; i < sortedArr.length; i++) {
    if (time > sortedArr[i][1]) {
      time = sortedArr[i][1];
    }
    time -= sortedArr[i][0];
  }

  if (time < 0) console.log(-1);
  else console.log(time);

  process.exit();
});
