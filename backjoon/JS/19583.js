const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const compareTime = (t1, t2) => {
  // t2이 더 나중이면 1, 같으면 0, t1이 더 나중이면 -1
  const [hour1, min1] = t1.split(':').map((el) => parseInt(el));
  const [hour2, min2] = t2.split(":").map((el) => parseInt(el));

  if (t1 === t2) return 0;

  if (hour1 === hour2) {
    if (min1 < min2) return 1;
    else return -1;
  } else {
    if (hour1 < hour2) return 1;
    else return -1;
  }
};

rl.on("line", (line) => {
  input.push(line.split(' '));
}).on("close", function () {
  const [start, end, streamEnd] = input.shift();

  const obj = {};
  let num = 0;

  for (let i = 0; i < input.length; i++) {
    const [time, name] = input[i];

    if (compareTime(time, start) >= 0) {
      obj[name] = 1;
    }
    if (compareTime(end, time) >= 0 && compareTime(time, streamEnd) >= 0) {
      if (obj[name] === 1) {
        obj[name]++;
        num++;
      }
    }
  }
  console.log(num);

  process.exit();
});
