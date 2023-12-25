const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input = line.split(" ").map((el) => parseInt(el));
}).on("close", function () {
  const [d, k] = input;

  const fibo = new Array(d).fill(0);
  fibo[0] = 0;
  fibo[1] = 1;
  fibo[2] = 1;

  for (let i = 2; i < k; i++) {
    fibo[i] = fibo[i - 1] + fibo[i - 2];
  }
  
  for (let b = 1; b < k; b++) {
    for (let a = 1; a <= b; a++) {
      const foo = fibo[d - 2] * a;
      const bar = fibo[d - 1] * b;

      if (foo + bar === k) {
        console.log(a);
        console.log(b);
        
        process.exit();
      }
    }
  }
  
  process.exit();
});
