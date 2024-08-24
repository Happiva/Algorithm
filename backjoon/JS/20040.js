const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m] = input.shift();
  let answer = 0;

  const obj = {};
  for (let i = 0; i < n; i++) {
    obj[i] = i;
  }

  const findParent = (x) => {
    let parent = x;

    while (obj[parent] !== parent) {
      parent = obj[parent];
    }

    return parent;
  };

  const union = (v1, v2) => {
    const parent1 = findParent(v1);
    const parent2 = findParent(v2);

    if (parent1 < parent2) obj[parent2] = parent1;
    else obj[parent1] = parent2;
  };

  const isConnected = (v1, v2) => {
    return findParent(v1) === findParent(v2);
  };

  for (let i = 0; i < m; i++) {
    const [v1, v2] = input[i];

    if (!isConnected(v1, v2)) {
      union(v1, v2);
    } else {
      answer = i + 1;
      break;
    }
  }

  console.log(answer);
  process.exit();
});
