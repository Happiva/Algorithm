function solution(x, y, n) {
  const queue = [[y, 0]];

  let answer = Infinity;

  while (queue.length > 0) {
    const [current, num] = queue.shift();

    if (current === x) {
      answer = Math.min(answer, num);
      break;
    }

    if (current % 3 === 0) {
      queue.push([current / 3, num + 1]);
    }
    if (current % 2 === 0) {
      queue.push([current / 2, num + 1]);
    }
    if (current - n > 0) {
      queue.push([current - n, num + 1]);
    }
  }

  return answer === Infinity ? -1 : answer;
}
