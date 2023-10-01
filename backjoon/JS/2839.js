const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = parseInt(line);
}).on("close", function () {
  let minimum = Infinity;

  const endOfI = Math.floor(input / 5);
  const endOfJ = Math.floor(input / 3);

  for (let i = 0; i <= endOfI; i++) {
    for (let j = 0; j <= endOfJ; j++) {
      if (i * 5 + j * 3 === input) {
        if (minimum > i + j) minimum = i + j;
      }
    }
  }

  if (minimum === Infinity) {
    console.log(-1);
  } else console.log(minimum);

  process.exit();
});
