const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [v, e] = input.shift();
  let sum = 0;

  const parentObj = {};

  for (let i = 1; i <= v; i++) {
    parentObj[i] = i; // 자기 자신을 부모로 갖는 트리 집합
  }

  const edges = input.sort((e1, e2) => e1[2] - e2[2]);

  const findParent = (v) => {
    let parent = v;

    while (parentObj[parent] !== parent) {
      parent = parentObj[parent];
    }

    return parent;
  };

  const union = (v1, v2) => {
    const parent1 = findParent(v1);
    const parent2 = findParent(v2);
    if (parent1 < parent2) return parentObj[parent2] = parent1;
    else return parentObj[parent1] = parent2;
  };

  const isConnected = (v1, v2) => {
    return findParent(v1) === findParent(v2);
  };

  for (const edge of edges) {
    const [v1, v2, weight] = edge;

    if (!isConnected(v1, v2)) {
      sum += weight;
      union(v1, v2);
    }
  }

  console.log(sum);
  process.exit();
});
