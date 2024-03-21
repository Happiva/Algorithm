const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const start = input.shift();
  const target = input.shift();
  let isAble = false;
  
  const checkStr = (str) => {
    if (str.length === start.length) {
      if (str === start) {
        isAble = true;
      }
      return;
    }

    if (str[str.length - 1] === "A") {
      checkStr(str.slice(0, str.length - 1));
    }
    if (str[0] === "B") {
      checkStr(str.slice(1).split('').reverse().join(''));
    }
  };

  checkStr(target);

  console.log(isAble ? 1 : 0);
  process.exit();
});
