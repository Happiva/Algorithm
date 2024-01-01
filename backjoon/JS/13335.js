const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, w, l] = input.shift();
  const queue = input[0];
  let time = 0;

  const bridge = new Array(w).fill(0);
  let numOfTruck = 0;
  let currentWeight = 0;

  while (queue.length) {
    const nextTruck = queue[0];

    if (nextTruck + currentWeight <= l && numOfTruck + 1 <= w) {
      queue.shift();
      const out = bridge.shift();
      currentWeight -= out;
      if (out > 0) numOfTruck--;
      bridge.push(nextTruck);
      currentWeight += nextTruck;
      numOfTruck++;
    } else {
      const out = bridge.shift();
      currentWeight -= out;
      if (out > 0) numOfTruck--;

      if (nextTruck + currentWeight <= l && numOfTruck + 1 <= w) {
        queue.shift();

        bridge.push(nextTruck);
        currentWeight += nextTruck;
        numOfTruck++;
      } else bridge.push(0);
    }
    time++;
  }

  while (numOfTruck > 0) {
    const out = bridge.shift();
    currentWeight -= out;
    if (out > 0) numOfTruck--;
    bridge.push(0);
    time++;
  }

  console.log(time);

  process.exit();
});
