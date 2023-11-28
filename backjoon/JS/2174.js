const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const nextRow = [-1, 0, 1, 0];
const nextCol = [0, 1, 0, -1];
const direction = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
};

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", function () {
  const [col, row] = input.shift().map((el) => parseInt(el));
  const [robots, ] = input.shift().map((el) => parseInt(el));
  const robot = {};
  let error;

  const board = new Array(row);
  for (let i = 0; i < row; i++) {
    board[i] = (Array(col).fill(0));
  }

  for (let i = 1; i <= robots; i++) {
    const [x, y, dir] = input[i - 1];
    robot[i] = { x: row - parseInt(y), y: parseInt(x) - 1, dir: direction[dir] };
    board[row - parseInt(y)][parseInt(x) - 1] = i;
  }
  
  const rotateRight = (target, repeat) => {
    const newDirection = (robot[target].dir + repeat) % 4;
    robot[target].dir = newDirection;
  }

  const rotateLeft = (target, repeat) => {
    const newDirection = robot[target].dir - (repeat % 4);
    robot[target].dir = newDirection >= 0 ? newDirection : newDirection + 4;
  };

  const move = (target, repeat) => {
    const curDir = robot[target].dir;
    for (let j = 0; j < repeat; j++) {
      const curX = robot[target].x;
      const curY = robot[target].y;

      const nextX = curX + nextRow[curDir];
      const nextY = curY + nextCol[curDir];

      if (nextX < 0 || nextY < 0 || nextX >= row || nextY >= col) {
        error = `Robot ${target} crashes into the wall`;
        break;
      }

      if (board[nextX][nextY] !== 0) {
        error = `Robot ${target} crashes into robot ${board[nextX][nextY]}`;
        break;
      }
      board[curX][curY] = 0;
      board[nextX][nextY] = target;
      robot[target].x = nextX;
      robot[target].y = nextY;
    }
  }

  const commandsList = input.slice(robots);

  for (let i = 0; i < commandsList.length; i++) {
    const [target, command, repeat] = commandsList[i];
    if (command === 'L') {
      rotateLeft(target, parseInt(repeat));
    }
    if (command === 'R') {
      rotateRight(target, parseInt(repeat));
    }
    if (command === 'F') {
      move(parseInt(target), parseInt(repeat));
    }

    if (error != null) {
      console.log(error);
      process.exit();
    }
  }

  console.log('OK');

  process.exit();
});
