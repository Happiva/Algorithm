const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  let denominator; //분모
  let numerator; //분자

  if (input === 1) {
    console.log("1/1");
    process.exit();
  }

  let num;
  for (let i = 2; ; i++) {
    if ((i * (i + 1)) / 2 >= input) {
      num = i;
      break;
    }
  }

  const distance = (num * (num + 1)) / 2 - input;
  if (num % 2 === 1) {
    denominator = num - distance;
    numerator = distance + 1;
  } else {
    denominator = distance + 1;
    numerator = num - distance;
  }

  console.log(`${numerator}/${denominator}`);

  process.exit();
});
