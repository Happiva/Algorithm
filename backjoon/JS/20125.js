const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const n = parseInt(input[0]);
  const board = input.slice(1);

  let heart = {};
  let leftArm, rightArm;
  let leftLeg = 0;
  let rightLeg = 0;
  let body = 0;
  let foundHeart = false;

  for (let i = 0; i < n; i++) {
    // Find for head first
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "*" && !foundHeart) {
        heart.x = i + 1;
        heart.y = j;
        foundHeart = true;
        break;
      }
    }
    if (foundHeart) break;
  }

  leftArm = board[heart.x].slice(0, heart.y).replaceAll("_", "").length;
  rightArm = board[heart.x].slice(heart.y + 1).replaceAll("_", "").length;

  // Get body length
  let x;
  for (x = heart.x + 1; x < n; x++) {
    if (board[x][heart.y] === "*") body++;
    else break;
  }
  let leftLegEnd = false;
  let rightLegEnd = false;
  for (let p = x; p < n; p++) {
    if (leftLegEnd && rightLegEnd) break;
    if (board[p][heart.y - 1] === "*" && !leftLegEnd) {
      leftLeg++;
    } else if (board[p][heart.y - 1] !== "*") {
      leftLegEnd = true;
    }
    if (board[p][heart.y + 1] === "*" && !rightLegEnd) {
      rightLeg++;
    } else if (board[p][heart.y + 1] !== "*") {
      rightLegEnd = true;
    }
  }

  console.log(heart.x + 1, heart.y + 1);
  console.log(leftArm, rightArm, body, leftLeg, rightLeg);

  process.exit();
});
