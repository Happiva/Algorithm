class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(el) {
    this.queue.push(el);
    this.sort();
  }
  dequeue() {
    return this.queue.shift();
  }
  sort() {
    this.queue.sort((a, b) => a.weight - b.weight);
  }
}

function solution(N, road, K) {
  var answer = 0;
  const queue = new PriorityQueue();
  const distances = {};

  const adjacencyList = {};
  for (let i = 1; i <= N; i++) {
    if (i === 1) distances[i] = 0;
    else distances[i] = Infinity;

    adjacencyList[i] = [];
  }
  for (let i = 0; i < road.length; i++) {
    const [v1, v2, weight] = road[i];
    adjacencyList[v1].push({ node: v2, weight });
    adjacencyList[v2].push({ node: v1, weight });
  }

  queue.enqueue({ node: 1, weight: 0 });
  // 시작점을 1로 한 다익스트라
  while (queue.queue.length > 0) {
    const { node: currentNode, weight: currentDistance } = queue.dequeue();
    for (let v in adjacencyList[currentNode]) {
      const neighbor = adjacencyList[currentNode][v];
      const newDistance = neighbor.weight + distances[currentNode];

      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        queue.enqueue({ node: neighbor.node, weight: newDistance });
      }
    }
  }
  Object.values(distances).forEach((el) => {
    if (el <= K) answer++;
  });

  return answer;
}
