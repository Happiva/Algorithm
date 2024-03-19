const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

// N이 0, S가 1
// 1이 시계방향, -1이 반시계방향
// 인덱스 2번 - 6번이 서로 맞물림
rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const wheelArr = input.splice(0, 4).map((str) => str.split('').map((el) => parseInt(el)));
  const k = parseInt(input.shift());
  let answer = 0;

  const rotateWheel = (wheelNum, direction) => {
    if (direction === 1) {
      // 시계방향으로 움직이기
      const relocatedWheel = [
        wheelArr[wheelNum][7],
        ...wheelArr[wheelNum].slice(0, 7),
      ];
      wheelArr[wheelNum] = relocatedWheel;
    } else {
      const relocatedWheel = [
        ...wheelArr[wheelNum].slice(1),
        wheelArr[wheelNum][0],
      ];
      wheelArr[wheelNum] = relocatedWheel;
    }
  };
  
  for (let i = 0; i < k; i++) {
    const [num, dir] = input[i].split(' ').map((el) => parseInt(el));
    const toBeChanged = new Array(4).fill(0);
    toBeChanged[num - 1] = dir;

    // 회전의 연쇄반응을 따져야
    // 1번이 아니면 자기 왼쪽에 있는애 신경써야
    if (num > 1) {
      for (let j = num - 1; j > 0; j--) {
        if (wheelArr[j][6] !== wheelArr[j - 1][2]) {
          toBeChanged[j - 1] = toBeChanged[j] * (-1);
        } else break;
      }
    }
    // 4번이 아니면 자기 오른쪽에 있는애 신경써야
    if (num < 4) {
      for (let j = num - 1; j < 3; j++) {
        if (wheelArr[j][2] !== wheelArr[j + 1][6]) {
          toBeChanged[j + 1] = toBeChanged[j] * -1;
        } else break;
      }
    }

    for (let j = 0; j < 4; j++) {
      if (toBeChanged[j]) {
        rotateWheel(j, toBeChanged[j]);
      }
    }
  }

  wheelArr.forEach((arr, idx) => {
    answer += arr[0] === 1 ? Math.pow(2, idx) : 0;
  });

  console.log(answer);
  process.exit();
});
