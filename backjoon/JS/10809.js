const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line;
}).on("close", function () {
  const array = new Array(26);
  array.fill(-1);

  const num = "a".charCodeAt(0);

  for (index in input) {
    const asciiIdx = input.charCodeAt(index) - num;

    if (array[asciiIdx] === -1) {
      array[asciiIdx] = index;
    }
  }
  console.log(array.join(" "));

  process.exit();
});
