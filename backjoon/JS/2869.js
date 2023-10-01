const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const day = input[0];
  const night = input[1];
  const height = input[2];

  console.log(Math.ceil((height - day) / (day - night)) + 1);
});
