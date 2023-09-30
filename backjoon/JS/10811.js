const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const n = input[0][0];

  const array = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = i + 1;
  }

  for (let i = 1; i < input.length; i++) {
    const start = input[i][0];
    const end = input[i][1];
    const reversedSlice = array.slice(start - 1, end).reverse();
    array.splice(start - 1, end - start + 1, ...reversedSlice);
  }

  console.log(array.join(" "));

  process.exit();
});
