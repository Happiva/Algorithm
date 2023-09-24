const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  if (input <= 100 && input >= 90) {
    console.log("A");
  } else if (input < 90 && input > 79) {
    console.log("B");
  } else if (input < 80 && input > 69) {
    console.log("C");
  } else if (input < 70 && input > 59) {
    console.log("D");
  } else {
    console.log("F");
  }

  process.exit();
});
