const readline = require("readline");
const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const tests = parseInt(input.shift());
  let answer = '';

  for (let i = 0; i < tests; i++) {
    const testCase = input.splice(0, 3);
    const command = testCase[0];
    const arrStr = testCase[2].slice(1, -1);
    const arr = arrStr === '' ? [] : arrStr.split(',').map((n) => parseInt(n));
    
    let quitFlag = false;
    let isReverse = false;
    let front = 0;
    let rear = parseInt(testCase[1]);

    for (let j = 0; j < command.length; j++) {
      if (command[j] === 'R') {
        isReverse = !isReverse;
      }
      if (command[j] === 'D') {
        if (front === rear) { // empty case
          answer += 'error\n';
          quitFlag = true;
          break;
        } else {
          if (!isReverse) front++;
          else rear--;
        }
      }
    }
    if (!quitFlag) {
      if (!isReverse) answer += `[${arr.slice(front, rear).join(",")}]\n`;
      else answer += `[${arr.slice(front, rear).reverse().join(",")}]\n`;
    }
  }
  console.log(answer);

  process.exit();
});
