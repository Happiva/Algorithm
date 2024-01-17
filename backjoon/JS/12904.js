const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const start = input[0];
  const target = input[1].split('');
  
  while (target.length !== start.length) {
    if (target[target.length - 1] !== 'A' && target[target.length - 1] !== 'B') {
      console.log(0);
      process.exit();
    }
    
    const last = target.pop();

    if (last === 'B') target.reverse();
  }

  if (target.join('') === start) console.log(1);
  else console.log(0);

  process.exit();
});
