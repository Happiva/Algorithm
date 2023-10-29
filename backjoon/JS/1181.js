const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const set = new Set(input.slice(1));
  const sortedArr = Array.from(set).sort((a, b) => {
    if (a.length === b.length) {
      if (a < b) return -1;
      else return 1;
    }
    return a.length - b.length;
  });

  console.log(sortedArr.join("\n").trim());

  process.exit();
});
