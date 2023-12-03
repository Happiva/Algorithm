const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const direction = {
  1: [0, 1],
  2: [0, -1],
  3: [-1, 0],
  4: [1, 0],
};

rl.on("line", (line) => {
  input.push(line.split(" ").map((el) => parseInt(el)));
}).on("close", function () {
  const [n, m, firstX, firstY, k] = input.shift();
  const board = input.slice(0, n);

  const answer = [];
  const commandArr = input[input.length - 1];

  const dice = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  let currentDice = [1, 6, 2, 3, 5, 4]; // top, bottom, n, e, s, w

  let currentX = firstX,
    currentY = firstY;

  for (let i = 0; i < k; i++) {
    const command = commandArr[i];
    const nextX = currentX + direction[command][0];
    const nextY = currentY + direction[command][1];

    if (nextX < 0 || nextY < 0 || nextX >= n || nextY >= m) {
      // 유효하지 않은 명령
      continue;
    }

    currentX = nextX;
    currentY = nextY;

    const [top, bottom, north, east, south, west] = currentDice;
    switch (command) {
      case 1:
        currentDice = [west, east, north, top, south, bottom];
        break;
      case 2:
        currentDice = [east, west, north, bottom, south, top];
        break;
      case 3:
        currentDice = [south, north, top, east, bottom, west];
        break;
      case 4:
        currentDice = [north, south, bottom, east, top, west];
        break;
    }
    const currentFloor = currentDice[1];

    if (board[currentX][currentY] === 0) {
      board[currentX][currentY] = dice[currentFloor];
    } else {
      dice[currentFloor] = board[currentX][currentY];
      board[currentX][currentY] = 0;
    }

    answer.push(dice[7 - currentFloor]);
  }
  console.log(answer.join("\n").trim());

  process.exit();
});
