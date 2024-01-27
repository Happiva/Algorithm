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
  const truthSet = new Set(input.shift().slice(1));
  let parties = [];
  let answer = 0;

  if (truthSet.size === 0) {
    console.log(m);
    process.exit();
  }
  
  const adjacencyList = {};
  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < input.length; i++) {
    const curPartyPeople = input[i].slice(1);
    parties.push(curPartyPeople);

    for (let j = 0; j < curPartyPeople.length; j++) {
      for (let k = j + 1; k < curPartyPeople.length; k++) {
        adjacencyList[curPartyPeople[j]].push(curPartyPeople[k]);
        adjacencyList[curPartyPeople[k]].push(curPartyPeople[j]);
      }
    }
  }

  const bfs = (el) => {
    let queue = [el];
    while (queue.length > 0) {
      const current = queue.shift();

      adjacencyList[current].forEach((neighbor) => {
        if (!truthSet.has(neighbor)) {
          truthSet.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
  };

  truthSet.forEach((el) => bfs(el));

  for (let i = 0; i < m; i++) {
    if (parties[i].filter((el) => truthSet.has(el)).length === 0) {
      answer++;
    }
  }

  console.log(answer);

  process.exit();
});
