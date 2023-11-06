const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

const checkForPalindrome = (obj) => {
  let num = 0;
  for (slice of Object.keys(obj)) {
    if (obj[slice] % 2 === 1) num++;
  }
  if (num > 1) return false;
  else return true;
};

const makePalindrome = (obj) => {
  let medium = "";
  for (slice of Object.keys(obj)) {
    if (obj[slice] % 2 === 1) {
      medium = slice;

      obj[slice]--;
      if (obj[slice] === 0) {
        delete obj[slice];
      }
    }
  }
  let left = "";
  for (slice of Object.keys(obj)) {
    const repeat = obj[slice] / 2;
    left += slice.repeat(repeat);
  }

  return left + medium + left.split("").reverse().join("");
};

rl.on("line", (line) => {
  input = line;
}).on("close", function () {
  const strArr = input.split("").sort();
  const obj = {};
  for (el of strArr) {
    obj[el] = obj[el] != null ? obj[el] + 1 : 1;
  }

  if (!checkForPalindrome(obj)) {
    console.log("I'm Sorry Hansoo");
    process.exit();
  }
  console.log(makePalindrome(obj));

  process.exit();
});
