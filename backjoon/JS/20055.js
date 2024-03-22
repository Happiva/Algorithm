const readline = require("readline");
const rl = readline.createInterface({
  input:process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, k] = input.shift();
  let belt = input.shift();
  let step = 1, zero = 0;
  let robotLocation = new Array(2 * n).fill(false);

  belt.forEach((el) => {
    if (el === 0) zero++;
  })

  while (true) {
    belt = [belt[2 * n - 1], ...belt.slice(0, 2 * n - 1)];
    robotLocation = [
      robotLocation[2 * n - 1],
      ...robotLocation.slice(0, 2 * n - 1),
    ];
    if (robotLocation[n - 1]) robotLocation[n - 1] = false;

    for (let i = 2 * n - 1; i >= 0; i--) {
      if (robotLocation[i]) {
        const next = (i + 1) % (2 * n);
        if (belt[next] >= 1 && !robotLocation[next]) {
          belt[next]--;
          if (belt[next] === 0) zero++;

          robotLocation[i] = false;
          robotLocation[next] = next === (n - 1) ? false : true;
        }
      }
    }

    if (belt[0] > 0) {
      robotLocation[0] = true;
      belt[0]--;
      if (belt[0] === 0) zero++;
    }

    if (zero >= k) break;
    else step++;
  }

  console.log(step);
  process.exit();
});
