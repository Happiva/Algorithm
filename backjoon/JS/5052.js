const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Node {
  constructor (child = {}) {
    this.child = child;
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor () {
    this.root = new Node();
  }

  insert (str) {
    let current = this.root;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (!current.child[char]) {
        current.child[char] = new Node();
      }
      current = current.child[char];
    }
    current.isEndOfWord = true;
  }

  check (str) {
    let current = this.root;
    let isConsistent = true;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (i < str.length - 1 && current.child[char].isEndOfWord) {
        isConsistent = false;
        break;
      }
      current = current.child[char];
    }

    return isConsistent;
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const testCase = parseInt(input.shift());
  let answer = '';
  
  for (let c = 0; c < testCase; c++) {
    const n = parseInt(input.shift());
    const sortedArr = input.splice(0, n).sort((a, b) => {
      if (a.length === b.length) {
        return a - b;
      }
      return a.length - b.length;
    });
    
    let trie = new Trie();
    sortedArr.forEach((el) => trie.insert(el));

    let isListConsistent = true;

    for (let s = 0; s < n; s++) {
      if (!trie.check(sortedArr[s])) {
        isListConsistent = false;
        break;
      }
    }

    answer += (isListConsistent ? 'YES\n' : 'NO\n');
  }
  
  console.log(answer.trimEnd());
  process.exit();
});
