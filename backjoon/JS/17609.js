const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const checkPalindrome = (str) => {

  let left = 0, right = str.length - 1;

  while (left < right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      let isLeftPalindrome = false, isRightPalindrome = false;

      if (str[left] === str[right - 1]) {
        isLeftPalindrome = true;
        let a = left,
          b = right - 1;
        while (a < b) {
          if (str[++a] !== str[--b]) {
            isLeftPalindrome = false;
            break;
          }
        }
      }
      if (str[left + 1] === str[right]) {
        isRightPalindrome = true;
        let a = left + 1, b = right;
        while (a < b) {
          if (str[++a] !== str[--b]) {
            isRightPalindrome = false;
            break;
          }
        }
      }

      return isLeftPalindrome || isRightPalindrome ? 1 : 2;
    }
  }
  return 0;
};


rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input.shift());
  const answer = [];

  for (let i = 0; i < n; i++) {
    answer.push(checkPalindrome(input[i]));
  }
  console.log(answer.join('\n').trim());

  process.exit();
});
