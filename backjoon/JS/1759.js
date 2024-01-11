const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const vowel = ['a', 'e', 'i', 'o', 'u'];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [l, c] = input.shift().split(' ').map((el) => parseInt(el));
  const answer = [];
  const charArr = input
    .shift()
    .split(" ")
    .sort((a, b) => a < b ? -1 : 1);

  if (l === c) {
    console.log(charArr.join(''));
    process.exit();
  }

  const recursion = (str, vowelNum, start) => {
    for (let i = start; i < charArr.length; i++) {
      const newStr = str + charArr[i];
      const newVowelNum = vowel.includes(charArr[i]) ? vowelNum + 1 : vowelNum;

      if (
        newStr.length === l &&
        newVowelNum > 0 &&
        newStr.length - newVowelNum >= 2
      ) {
        answer.push(newStr);
      } else if (i <= c - 1 && newStr.length < l) {
        recursion(newStr, newVowelNum, i + 1);
      }
    }
  };

  recursion('', 0, 0);
 
  console.log(answer.join('\n').trim());
  
  process.exit();
});
