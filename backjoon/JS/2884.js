const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const hour = input[0];
  const minute = input[1];

  const newMin = minute - 45;

  if (newMin >= 0) {
    console.log(hour, newMin);
  } else {
    if (hour === 0) {
      console.log(23, 60 + newMin);
    } else {
      console.log(hour - 1, 60 + newMin);
    }
  }

  process.exit();
});
