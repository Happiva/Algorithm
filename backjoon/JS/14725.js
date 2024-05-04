const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Node {
  constructor () {
    this.children = {};
  }
}

class Tree {
  constructor () {
    this.root = new Node();
  }

  addNodes (arr) {
    let current = this.root;
    for (let j = 0; j < arr.length; j++) {
      const food = arr[j];
      if (current.children[food] == null) {
        current.children[food] = new Node();
      }
      current = current.children[food];
    }
  }
}

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const tree = new Tree();
  const n = parseInt(input.shift()[0]);
  let answer = '';

  for (let i = 0; i < n; i++) {
    const num = parseInt(input[i].shift());
    tree.addNodes(input[i]);
  }

  const printTree = (depth, node) => {
    const children = Object.keys(node.children).sort();

    for (let i = 0; i < children.length; i++) {
      let str = '';
      if (depth > 0) str += '--'.repeat(depth);
      answer += (str + children[i] + '\n');
      printTree(depth + 1, node.children[children[i]]);
    }
  };

  printTree(0, tree.root);
  
  console.log(answer.trimEnd());
  process.exit();
});
