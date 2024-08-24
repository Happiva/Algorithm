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
  const edges = input.sort((e1, e2) => e1[2] - e2[2]);

  let sum = 0, maxWeight = -Infinity;
  const parentObj = {};

  for (let i = 1; i <= n; i++) {
    parentObj[i] = i;
  }

  const findParent = (v) => {
    let parent = v;

    while (parentObj[parent] !== parent) {
      parent = parentObj[parent];
    }
  
    return parent;
  };

  const isConnected = (v1, v2) => {
    return findParent(v1) === findParent(v2);
  };

  const union = (v1, v2) => {
    const parent1 = findParent(v1);
    const parent2 = findParent(v2);

    if (parent1 < parent2) return parentObj[parent2] = parent1;
    else return parentObj[parent1] = parent2;
  };

  for (const edge of edges) {
    const [v1, v2, weight] = edge;

    if (!isConnected(v1, v2)) {
      sum += weight;
      union(v1, v2);

      maxWeight = Math.max(maxWeight, weight);
    }
  }

  console.log(sum - maxWeight);
  process.exit();
});
