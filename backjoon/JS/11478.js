const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = line;
}).on("close", function () {
  const set = new Set();

  for (let i = 1; i < input.length; i++) {
    let start = 0;
    while (start + i <= input.length) {
      set.add(input.slice(start, start + i));
      start++;
    }
  }
  set.add(input);

  console.log(set.size);

  process.exit();
});
