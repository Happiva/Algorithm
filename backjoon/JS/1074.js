const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [n, r, c] = input;
  let index = 0;

  const recursion = (num, x, y) => {
    if (num === 0) {
      console.log(index);
      return;
    } else {
      let next;
      if (num > 2) next = Math.pow(2, num - 2);
      else next = 1;
      const pass = Math.pow(4, num - 1);

      if (r < x && c < y) {
        recursion(num - 1, x - next, y - next);
      } else if (r < x && c >= y) {
        index += pass;
        recursion(num - 1, x - next, y + next);
      } else if (r >= x && c < y) {
        index += 2 * pass;
        recursion(num - 1, x + next, y - next);
      } else {
        index += 3 * pass;
        recursion(num - 1, x + next, y + next);
      }
    }
  };

  const start = Math.pow(2, n - 1);
  recursion(n, start, start);
  
  process.exit();
});
