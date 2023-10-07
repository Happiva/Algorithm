const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let answer = "";

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  let num = 0;

  const recursion = (str, left, right) => {
    num++;
    if (left >= right) return 1;
    else if (str[left] != str[right]) return 0;
    else return recursion(str, left + 1, right - 1);
  };
  const isPalindrome = (str) => {
    return recursion(str, 0, str.length - 1);
  };

  for (let i = 1; i < input.length; i++) {
    const result = isPalindrome(input[i]);
    answer += `${result} ${num}\n`;
    num = 0;
  }

  console.log(answer.trimEnd());

  process.exit();
});
