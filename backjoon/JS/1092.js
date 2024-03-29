const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n] = input.shift();
  const crane = input.shift().sort((a, b) => b - a);
  const [m] = input.shift();
  const load = input[0].sort((a, b) => b - a);

  if (crane[0] < load[0]) {
    console.log(-1);
    process.exit();
  }

  let time = 0;
  let craneIdx = 0, loadIdx = 0;

  while (load.length > 0) {
    craneIdx = 0;
    loadIdx = 0;
    while (loadIdx < load.length && craneIdx < crane.length) {
      if (crane[craneIdx] >= load[loadIdx]) {
        craneIdx++;
        load.splice(loadIdx, 1);
      } else {
        loadIdx++;
      }
    }
    
    time++;
  }

  console.log(time);
  process.exit();
});
