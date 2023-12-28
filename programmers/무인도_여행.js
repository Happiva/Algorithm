const nextRow = [-1, 0, 1, 0];
const nextCol = [0, 1, 0, -1];

function solution(maps) {
  var answer = [];

  const col = maps.length;
  const row = maps[0].length;
  const visited = new Array(col);

  for (let i = 0; i < col; i++) {
    const newArr = new Array(row).fill(false);
    visited[i] = newArr;
  }

  const isInRange = (x, y) => {
    return x >= 0 && y >= 0 && x < col && y < row;
  };

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (maps[i][j] !== "X" && !visited[i][j]) {
        let num = parseInt(maps[i][j]);
        visited[i][j] = true;
        const queue = [[i, j]];

        while (queue.length > 0) {
          const [currentX, currentY] = queue.shift();

          for (let k = 0; k < 4; k++) {
            const nextX = currentX + nextRow[k];
            const nextY = currentY + nextCol[k];
            if (
              isInRange(nextX, nextY) &&
              !visited[nextX][nextY] &&
              maps[nextX][nextY] !== "X"
            ) {
              num += parseInt(maps[nextX][nextY]);
              visited[nextX][nextY] = true;
              queue.push([nextX, nextY]);
            }
          }
        }
        answer.push(num);
      }
    }
  }

  if (answer.length === 0) answer.push(-1);
  else answer.sort((a, b) => a - b);

  return answer;
}
