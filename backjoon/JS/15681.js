const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Node {
  constructor () {
    this.parent = undefined;
    this.children = [];
  }

  setParent (parent) {
    this.parent = parent;
  }

  addChild (child) {
    this.children.push(child);
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [n, r, q] = input.shift().split(' ').map(el => parseInt(el));
  const adjacencyList = {};
  const tree = {}, size = new Array(n + 1).fill(1);
  let answer = '';

  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
    tree[i] = new Node();

    if (i === r) tree[i].setParent(-1);
  }

  for (let i = 0; i < n - 1; i++) {
    const [v1, v2] = input[i].split(' ').map(el => parseInt(el));
    adjacencyList[v1].push(v2);
    adjacencyList[v2].push(v1);
  }

  const makeTree = (current, parent) => {
    for (let neighbor of adjacencyList[current]) {
      if (neighbor !== parent) {
        tree[neighbor].setParent(current);
        tree[current].addChild(neighbor);

        makeTree(neighbor, current);
      }
    }
  };

  const countSubtreeNodes = (current) => {
    for (let node of tree[current].children) {
      countSubtreeNodes(node);
      size[current] += size[node];
    }
  }; 

  makeTree(r, -1);
  countSubtreeNodes(r);

  for (let i = n - 1; i < input.length; i++) {
    answer += `${size[parseInt(input[i])]}\n`;
  }
  
  console.log(answer.trimEnd());
  process.exit();
});
