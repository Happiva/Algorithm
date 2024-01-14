const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const testCase = parseInt(input.shift());
  const answer = [];

  for (let i = 0; i < testCase; i++) {
    const str = input[0];
    const k = parseInt(input[1]);
  
    const obj = {};

    for (let j = 0; j < str.length; j++) {
      if (obj[str[j]] == null) obj[str[j]] = [];
      obj[str[j]].push(j);
    }

    let canBeSolved = false;
    for (key in obj) {
      if (obj[key].length >= k) canBeSolved = true;
      else delete obj[key];
    }

    if (!canBeSolved) {
      answer.push(-1);
      input.splice(0, 2);
      continue;
    }

    let minStr = Infinity;
    let maxStr = -Infinity;

    for (key in obj) {
      let left = 0, right = k - 1;
      while (right < obj[key].length) {
        const strLength = obj[key][right] - obj[key][left] + 1;
        minStr = Math.min(minStr, strLength);
        maxStr = Math.max(maxStr, strLength);
        left++;
        right++;
      }
    }
    answer.push(`${minStr} ${maxStr}`);

    input.splice(0, 2);
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
