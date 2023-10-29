const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const arr = input.slice(1);
  const sortedArr = arr
    .sort((p1, p2) => {
      if (p1[0] === p2[0]) {
        return p1[1] < p2[1] ? -1 : 1;
      }
      return p1[0] < p2[0] ? -1 : 1;
    })
    .map((p) => p.join(" "));

  console.log(sortedArr.join("\n").trim());

  process.exit();
});
