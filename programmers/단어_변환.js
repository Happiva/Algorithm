function isChangeable(a, b) {
  let difference = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) difference++;
    if (difference > 1) return false;
  }

  return difference === 1 ? true : false;
}

function solution(begin, target, words) {
  let answer = 0;

  if (!words.includes(target)) return 0;

  const visited = new Array(words.length).fill(-1);
  const stack = [[begin, 0]];

  while (stack.length) {
    const [current, length] = stack.pop();
    const newLength = length + 1;

    if (visited[current] !== -1 && visited[current] < newLength) {
      continue;
    }

    visited[current] = newLength;

    if (current === target) {
      if (answer === 0) answer = length;
      else answer = Math.min(answer, length);
      continue;
    }

    words.forEach((el) => {
      if (isChangeable(current, el)) {
        stack.push([el, newLength]);
      }
    });
  }

  return answer;
}
