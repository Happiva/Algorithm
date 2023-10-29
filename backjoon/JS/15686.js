const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const home = [];
const chicken = [];
const selectedChicken = [];
let minChickenDisForCity = Infinity;
let n, m;

const calculateDistance = (p1, p2) => {
  const [r1, c1] = p1;
  const [r2, c2] = p2;
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};

const search = (num, cIdx) => {
  if (num === m) {
    let chickenDisForCity = 0;
    for (let i = 0; i < home.length; i++) {
      let min = Infinity;
      for (idx in chicken) {
        if (selectedChicken[idx]) {
          min = Math.min(min, calculateDistance(home[i], chicken[idx]));
          if (min === 1) break;
        }
      }
      chickenDisForCity += min;

      if (chickenDisForCity > minChickenDisForCity) break;
    }
    minChickenDisForCity = Math.min(minChickenDisForCity, chickenDisForCity);
    return;
  }

  for (let i = cIdx; i < chicken.length; i++) {
    if (!selectedChicken[i]) {
      selectedChicken[i] = true;
      search(num + 1, i);
      selectedChicken[i] = false;
    }
  }
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  n = input[0][0];
  m = input[0][1];

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === 1) home.push([i, j + 1]);
      else if (input[i][j] === 2) {
        chicken.push([i, j + 1]);
        selectedChicken.push(false);
      }
    }
  }

  search(0, 0);

  console.log(minChickenDisForCity);

  process.exit();
});
