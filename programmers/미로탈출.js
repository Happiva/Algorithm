const nextRow = [-1, 0, 1, 0];
const nextCol = [0, 1, 0, -1];

function solution(maps) {
  var answer = 0;
  const col = maps.length;
  const row = maps[0].length;
  const visited = new Array(col);
  for (let i = 0; i < col; i++) {
    const newArr = new Array(row).fill(-1);
    visited[i] = newArr;
  }

  let leverX, leverY;

  const isInRange = (x, y) => {
    return x >= 0 && y >= 0 && x < col && y < row;
  };

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (maps[i][j] === "S") {
        const queue = [[i, j]];
        visited[i][j] = 0;

        while (queue.length > 0) {
          const [currentX, currentY] = queue.shift();

          if (maps[currentX][currentY] === "L") {
            answer += visited[currentX][currentY];
            leverX = currentX;
            leverY = currentY;
            break;
          }

          for (let k = 0; k < 4; k++) {
            const nextX = currentX + nextCol[k];
            const nextY = currentY + nextRow[k];
            if (
              isInRange(nextX, nextY) &&
              visited[nextX][nextY] < 0 &&
              maps[nextX][nextY] !== "X"
            ) {
              queue.push([nextX, nextY]);
              visited[nextX][nextY] = visited[currentX][currentY] + 1;
            }
          }
        }
      }
    }
  }

  if (answer === 0) {
    return -1;
  }

  for (let i = 0; i < col; i++) {
    visited[i].fill(-1);
  }

  const queue = [[leverX, leverY]];
  visited[leverX][leverY] = 0;
  let distance = 0;

  while (queue.length > 0) {
    const [currentX, currentY] = queue.shift();

    if (maps[currentX][currentY] === "E") {
      distance += visited[currentX][currentY];
      break;
    }

    for (let k = 0; k < 4; k++) {
      const nextX = currentX + nextCol[k];
      const nextY = currentY + nextRow[k];
      if (
        isInRange(nextX, nextY) &&
        visited[nextX][nextY] < 0 &&
        maps[nextX][nextY] !== "X"
      ) {
        queue.push([nextX, nextY]);
        visited[nextX][nextY] = visited[currentX][currentY] + 1;
      }
    }
  }

  if (distance === 0) {
    return -1;
  }

  return answer + distance;
}
