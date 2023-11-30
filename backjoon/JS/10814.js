const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  let answer = '';
  const n = parseInt(input.shift());

  const sortedArr = input.sort((arr1, arr2) => {
    const [age1] = arr1;
    const [age2] = arr2;

    return parseInt(age1) - parseInt(age2);
  });

  sortedArr.forEach((arr) => {
    answer += arr.join(' ') + '\n';
  });

  console.log(answer);

  process.exit();
});
