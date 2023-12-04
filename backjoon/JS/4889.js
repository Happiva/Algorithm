const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Stack {
  constructor (size) {
    this.array = new Array(size + 1);
    this.top = -1;
  }
  push (el) {
    if (this.top === this.array.length - 1) return -1;
    this.array[++this.top] = el;
  }
  pop () {
    if (this.top === -1) return -1;
    return this.array[this.top--];
  }
  isEmpty () {
    return this.top === -1;
  }
  getTop () {
    return this.array[this.top];
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  let answer = '';
  
  for (let i = 0; i < input.length - 1; i++) {
    /*
      1. 문자열의 첫 번째부터 순회, {가 등장하면 push
      2. } 이 등장하면, stack의 top이 {이면 pop
        스택이 완전히 비어있으면 필요한 연산이 없게됨.
      3. 스택에 남은 요소들을 어떻게 잘 변환시켜서 완전하게 만들기?
      -> 그리디적으로 생각하면... {}만 만들면 된다고 가정?
    */
   const str = input[i];
   const stack = new Stack(str.length);

   for (let j = 0; j < str.length; j++) {
    if (str[j] === '{') stack.push(str[j]);
    if (str[j] === '}') {
      if (stack.getTop() === "{") stack.pop();
      else stack.push(str[j]);
    }
   }

   if (stack.isEmpty()) {
    answer += `${i + 1}. 0\n`;
   } else {
    let num = 0;
    const unstableStr = stack.array.slice(0, stack.top + 1);
    for (let j = 0; j < unstableStr.length; j = j + 2) {
      if (unstableStr[j] === unstableStr[j + 1]) {
        num++;
      } else {
        num += 2;
      }
    }
    answer += `${i + 1}. ${num}\n`;
   }
  }

  console.log(answer.trim());

  process.exit();
});
