const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  let array = new Array(30);
  let num1 = 0;
  let num2 = 0;
  for (let i = 0; i < array.length; i++) {
    array[i] = 0;
  }

  for (let i = 0; i < input.length; i++) {
    array[input[i] - 1] = input[i];
  }

  for (index in array) {
    if (array[index] < 1) {
      if (num1 === 0) num1 = parseInt(index) + 1;
      else num2 = parseInt(index) + 1;
    }
  }
  if (num1 < num2) {
    console.log(num1);
    console.log(num2);
  } else {
    console.log(num2);
    console.log(num1);
  }

  process.exit();
});
