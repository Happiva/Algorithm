const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Tree {
  constructor(root, left, right) {
    this.root = root;
    this.tree = {};
    this.tree[root] = [left, right];
  }
  addNode(node, left, right) {
    this.tree[node] = [left, right];
  }
  preOrder() {
    const visited = [];
    const current = this.root;
    const tree = this.tree;

    const search = (node) => {
      visited.push(node);
      const [left, right] = tree[node];
      if (left != null) search(left);
      if (right != null) search(right);
    };

    search(current);

    return visited.join("");
  }

  inOrder() {
    const visited = [];
    const current = this.root;
    const tree = this.tree;

    const search = (node) => {
      const [left, right] = tree[node];
      if (left != null) search(left);
      visited.push(node);
      if (right != null) search(right);
    };

    search(current);

    return visited.join("");
  }

  postOrder() {
    const visited = [];
    const current = this.root;
    const tree = this.tree;

    const search = (node) => {
      const [left, right] = tree[node];
      if (left != null) search(left);
      if (right != null) search(right);
      visited.push(node);
    };

    search(current);

    return visited.join("");
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const [rootValue, left, right] = input[0].split(' ');

  const tree = new Tree(rootValue, left === '.' ? null : left, right === '.' ? null : right);

  for (let i = 1; i < n; i++) {
    const [value, l, r] = input[i].split(' ');
    tree.addNode(value, l === '.' ? null : l, r === '.' ? null : r);
  }

  console.log(tree.preOrder());
  console.log(tree.inOrder());
  console.log(tree.postOrder());

  process.exit();
});
