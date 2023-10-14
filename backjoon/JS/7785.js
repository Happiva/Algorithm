const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const set = new Set();

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  for (let i = 1; i < input.length; i++) {
    if (input[i][1] === "enter") {
      set.add(input[i][0]);
    } else {
      set.delete(input[i][0]);
    }
  }
  let arr = [];

  set.forEach((v1, v2, set) => {
    arr.push(v1);
  });

  console.log(arr.sort().reverse().join("\n"));

  process.exit();
});
