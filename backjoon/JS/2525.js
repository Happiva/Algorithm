const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = input.concat(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const hour = input[0];
  const minute = input[1];
  const timeToCook = input[2];

  const newMin = (minute + timeToCook) % 60;
  const newHour = hour + Math.floor((minute + timeToCook) / 60);

  if (newHour > 23) {
    console.log(newHour - 24, newMin);
  } else {
    console.log(newHour, newMin);
  }

  process.exit();
});
