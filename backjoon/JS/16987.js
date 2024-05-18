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
  const eggs = input;
  let answer = 0;

  const breakEgg = (currentIdx, brokenEggCount) => {
    if (currentIdx >= n) {
      answer = Math.max(answer, brokenEggCount);
      return;
    }

    if (eggs[currentIdx][0] <= 0 || brokenEggCount >= n - 1) {
      breakEgg(currentIdx + 1, brokenEggCount);
      return;
    }

    let isBrokeEgg = false;

    for (let i = 0; i < n; i++) {
      if (i !== currentIdx && eggs[i][0] > 0) {
        eggs[i][0] -= eggs[currentIdx][1];
        eggs[currentIdx][0] -= eggs[i][1];
        isBrokeEgg = true;

        let newlyBrokenEggs = 0;
        if (eggs[currentIdx][0] <= 0) newlyBrokenEggs++;
        if (eggs[i][0] <= 0) newlyBrokenEggs++;

        breakEgg(currentIdx + 1, brokenEggCount + newlyBrokenEggs);

        eggs[i][0] += eggs[currentIdx][1];
        eggs[currentIdx][0] += eggs[i][1];
      }
    }

    if (!isBrokeEgg) {
      answer = Math.max(answer, brokenEggCount);
      return;
    }
  };

  breakEgg(0, 0);
  
  console.log(answer);
  process.exit();
});
