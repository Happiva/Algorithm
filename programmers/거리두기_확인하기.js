const next = [-1, 0, 1, 0];

function solution(places) {
  var answer = [];

  const parseInput = (arr) => {
    return arr.map((str) => str.split(""));
  };

  const getDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < 5 && y < 5;
  };

  const bfs = (startX, startY, board) => {
    const queue = [[startX, startY]];
    const visited = Array.from(Array(5), () => Array(5).fill(0));
    visited[startX][startY] = 1;
    let isOkay = true;

    while (queue.length && isOkay) {
      const [curX, curY] = queue.shift();

      for (let d = 0; d < 4; d++) {
        const nextX = curX + next[d];
        const nextY = curY + next[(d + 1) % 4];

        if (
          isInRange(nextX, nextY) &&
          !visited[nextX][nextY] &&
          board[nextX][nextY] !== "X"
        ) {
          const realDistance = visited[curX][curY] + 1;

          visited[nextX][nextY] = realDistance;
          const mDistance = getDistance(startX, startY, nextX, nextY);
          if (mDistance <= 2) queue.push([nextX, nextY]);

          if (board[nextX][nextY] === "P") {
            if (mDistance <= 2 && realDistance - 1 <= 2) isOkay = false;
          }
        }
      }
    }

    return isOkay;
  };

  for (let place = 0; place < places.length; place++) {
    const board = parseInput(places[place]);
    let noPeople = true;
    let isOkay = true;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (board[i][j] === "P") {
          noPeople = false;
          const result = bfs(i, j, board);
          if (!result) isOkay = false;
        }
      }
      if (!isOkay) break;
    }
    if (!noPeople) {
      answer.push(isOkay ? 1 : 0);
    }
    if (noPeople) answer.push(1);
  }

  return answer;
}
