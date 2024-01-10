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

  const sortedArr = input.sort((str1, str2) => {
    if (str1.length !== str2.length) {
      return str1.length - str2.length;
    }

    let num1 = 0, num2 = 0;
    str1.split('').forEach((el) => {
      if (!Number.isNaN(parseInt(el))) num1 += parseInt(el);
    });
    str2.split('').forEach((el) => {
      if (!Number.isNaN(parseInt(el))) num2 += parseInt(el);
    });

    if (num1 !== num2) return num1 - num2;
    else {
      if (str1 < str2) return -1;
      else return 1;
    }
  });

  console.log(sortedArr.join('\n').trim());

  process.exit();
});
