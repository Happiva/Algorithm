const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = line;
}).on("close", function () {
  const isOpened = new Array(input.length).fill(false);
  let answer = '';

  const getStrFromArr = () => {
    let str = "";
    for (let i = 0; i < isOpened.length; i++) {
      if (isOpened[i]) {
        str += input[i];
      }
    }
    answer += str + "\n";
  };

  const recursive = (start, end) => {
    if (start === end) return;

    let minIdx = start;
    for (let i = start; i < end; i++) {
      if (input[minIdx] > input[i] && !isOpened[i]) minIdx = i;
    }
    isOpened[minIdx] = true;
    getStrFromArr();

    recursive(minIdx + 1, end);
    recursive(start, minIdx);
  };

  recursive(0, input.length);

  console.log(answer);

  process.exit();
});
