const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  let hotKeyObj = {};

  for (let i = 0; i < n; i++) {
    let hasSetKey = false;
    const words = input[i].split(' ');

    for (let j = 0; j < words.length; j++) {
      const first = words[j][0];
      if (hotKeyObj[first.toUpperCase()] == null) {
        hotKeyObj[first.toUpperCase()] = words[j];
        words[j] = words[j].replace(first, `[${first}]`);
        input[i] = words.join(' ');
        hasSetKey = true;
        break;
      }
    }

    if (!hasSetKey) {
      for (let j = 0; j < input[i].length; j++) {
        const char = input[i][j];
        if (char !== ' ' && hotKeyObj[char.toUpperCase()] == null) {
          hotKeyObj[char.toUpperCase()] = input[i];
          input[i] = input[i].replace(char, `[${char}]`);
          break;
        }
      }
    }
  }

  console.log(input.join('\n').trim());

  process.exit();
});
