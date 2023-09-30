const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  for (let i = 1; i < input.length; i++) {
    const repeatNum = parseInt(input[i][0]);
    let str = "";

    for (el of input[i][1]) {
      str += el.repeat(repeatNum);
    }
    console.log(str);
  }

  process.exit();
});
