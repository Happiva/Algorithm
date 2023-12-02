const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const numInfo = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [num1, num2] = input;

  const evaluate = (strNum) => {
    let num = 0;
    for (let i = 0; i < strNum.length; i++) {
      if (i < strNum.length - 1 && numInfo[strNum[i]] < numInfo[strNum[i + 1]]) {
        num += numInfo[strNum[i] + strNum[i + 1]];
        i++;
      } else num += numInfo[strNum[i]];
    }
    return num;
  };

  const getRomanNum = (num) => {
    let arabicNum = num;
    let answer = '';

    if (arabicNum >= 1000) {
      answer += 'M'.repeat(Math.floor(arabicNum / 1000));
      arabicNum %= 1000;
    }
    if (arabicNum >= 900) {
      answer += 'CM';
      arabicNum -= 900;
    }
    if (arabicNum >= 500) {
      answer += 'D';
      arabicNum -= 500;
    }
    if (arabicNum >= 400 && !answer.includes('CM')) {
      answer += 'CD';
      arabicNum -= 400;
    }
    if (arabicNum >= 100) {
      answer += 'C'.repeat(Math.floor(arabicNum / 100));
      arabicNum %= 100;
    }
    if (arabicNum >= 90) {
      answer += 'XC';
      arabicNum -= 90;
    }
    if (arabicNum >= 50) {
      answer += 'L';
      arabicNum -= 50;
    }
    if (arabicNum >= 40 && !answer.includes('XC')) {
      answer += 'XL';
      arabicNum -= 40;
    }
    if (arabicNum >= 10) {
      answer += 'X'.repeat(Math.floor(arabicNum / 10));
      arabicNum %= 10;
    }
    if (arabicNum === 9) {
      answer += 'IX';
      arabicNum -= 9;
    }
    if (arabicNum >= 5) {
      answer += 'V';
      arabicNum -= 5;
    }
    if (arabicNum === 4) {
      answer += 'IV';
      arabicNum -= 4;
    }
    if (arabicNum >= 1) {
      answer += 'I'.repeat(Math.floor(arabicNum / 1));
      arabicNum %= 1;
    }

    return answer;
  };

  const arabicSum = evaluate(num1) + evaluate(num2);

  console.log(arabicSum);
  console.log(getRomanNum(arabicSum));

  process.exit();
});
