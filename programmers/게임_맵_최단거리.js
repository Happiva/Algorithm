const next = [-1, 0, 1, 0];

function solution(maps) {
  var answer = 0;
  const n = maps.length;
  const m = maps[0].length;

  const queue = [[0, 0]];
  const visited = Array.from(Array(n), () => Array(m).fill(0));
  visited[0][0] = 1;

  const isInRange = (x, y) => {
    return 0 <= x && 0 <= y && x < n && y < m;
  };

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nextX = x + next[i];
      const nextY = y + next[(i + 1) % 4];

      if (
        isInRange(nextX, nextY) &&
        maps[nextX][nextY] === 1 &&
        !visited[nextX][nextY]
      ) {
        visited[nextX][nextY] = visited[x][y] + 1;
        queue.push([nextX, nextY]);
      }
    }
  }

  answer = visited[n - 1][m - 1] !== 0 ? visited[n - 1][m - 1] : -1;

  return answer;
}
