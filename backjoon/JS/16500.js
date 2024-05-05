const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const target = input.shift();
  const n = parseInt(input.shift());

  if (n === 1) {
    if (target === input[0]) console.log(1);
    else console.log(0);
    process.exit();
  }

  const dpArr = new Array(101).fill(false);

  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < n; j++) {
      const slicedLength = target.length - i;
      const currentLength = input[j].length;

      if (i === 0 || dpArr[i]) {
        if (slicedLength >= currentLength) {
          const slicedStr = target.slice(i, i + currentLength);

          if (slicedStr === input[j]) {
            dpArr[i + currentLength] = true;
          }
        }
      }
    }
  }

  console.log(dpArr[target.length] ? 1 : 0);
  process.exit();
});
