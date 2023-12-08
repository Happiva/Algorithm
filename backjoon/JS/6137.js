const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  let left = 0, right = n - 1;
  let answer = '';
  let length = 0;

  while (left <= right) {
    if (left === right) {
      answer += input[left];
      length++;
      break;
    }

    if (input[left] < input[right]) {
      answer += input[left];
      length++;
      left++;
    } else if (input[left] > input[right]) {
      answer += input[right];
      length++;
      right--;
    }
    if (length === 80) {
      answer += "\n";
      length = 0;
    }
    
    if (input[left] === input[right]) {
      let i = 0;
      while (true) {
        i++;
        if (input[left + i] === input[right - i]) continue;
        else {
          if (input[left + i] < input[right - i]) {
            answer += input[left];
            length++;
            left++;
            if (length === 80) {
              answer += "\n";
              length = 0;
            }
          } else {
            answer += input[right];
            length++;
            right--;
            if (length === 80) {
              answer += "\n";
              length = 0;
            }
          }
          break;
        }
      }
    }
  }

  console.log(answer);

  process.exit();
});
