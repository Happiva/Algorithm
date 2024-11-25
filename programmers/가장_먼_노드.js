function solution(n, edge) {
  var answer = 0;
  let max = -1;
  const adjacencyList = {};
  const distances = new Array(n + 1).fill(Infinity);

  for (let i = 1; i <= n; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < edge.length; i++) {
    const [v1, v2] = edge[i];
    adjacencyList[v1].push(v2);
    adjacencyList[v2].push(v1);
  }

  const queue = [1];
  distances[1] = 0;
  while (queue.length) {
    const current = queue.shift();
    max = Math.max(max, distances[current]);

    adjacencyList[current].forEach((neighbor) => {
      if (distances[neighbor] === Infinity) {
        distances[neighbor] = distances[current] + 1;
        queue.push(neighbor);
      }
    });
  }

  answer = distances.filter((v) => v === max).length;
  return answer;
}
