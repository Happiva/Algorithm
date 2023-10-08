const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let answer = "";
let input = [];

const recursion = (start, end, strArr) => {
  if (end - start === 3) {
    strArr[start + 1] = " ";
  } else {
    const centerStart = (end - start) / 3 + start;
    const centerEnd = end - (end - start) / 3;
    for (let j = centerStart; j < centerEnd; j++) {
      strArr[j] = " ";
    }
    recursion(start, centerStart, strArr);
    recursion(centerEnd, end, strArr);
  }
};

rl.on("line", (line) => {
  input.push(parseInt(line));
}).on("close", function () {
  for (let i = 0; i < input.length; i++) {
    const arr = new Array(Math.pow(3, input[i]));
    arr.fill("-");

    if (input[i] === 0) answer += "-\n";
    else {
      recursion(0, arr.length, arr);
      answer += `${arr.join("")}\n`;
    }
  }
  console.log(answer.trimEnd());

  process.exit();
});
