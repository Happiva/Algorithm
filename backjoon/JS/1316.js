const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  let groupWordNum = 0;
  for (let i = 1; i < input.length; i++) {
    let isGroupWord = true;
    let obj = {};
    for (index in input[i]) {
      const c = input[i][index];
      if (obj[c] != null && obj[c] !== index - 1) {
        isGroupWord = false;
        break;
      } else {
        obj[c] = parseInt(index);
      }
    }
    if (isGroupWord) {
      groupWordNum++;
    }
  }

  console.log(groupWordNum);
});
