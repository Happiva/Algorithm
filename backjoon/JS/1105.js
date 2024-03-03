const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [l, r] = input;
  const leftLength = l.toString().length;
  const rightLength = r.toString().length;

  if (!l.toString().includes('8') || leftLength < rightLength) {
    console.log(0);
  } else if (l === r) {
    const str = l.toString();
    let answer = 0;
    for (let i = 0; i < leftLength; i++) {
      if (str[i] === '8') answer++;
    }
    console.log(answer);
  } else if (leftLength === rightLength) {
    const diff = r - l;
    let answer = 0;
    for (let i = 0; i < leftLength - diff.toString().length; i++) {
      if (l.toString()[i] === r.toString()[i]) {
        if (l.toString()[i] === "8" && r.toString()[i] === "8") answer++;
      }
      else break;
    }
    console.log(answer);
  }

  process.exit();
});
