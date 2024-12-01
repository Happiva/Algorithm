function solution(triangle) {
  var answer = 0;
  const n = triangle.length;
  const m = triangle[n - 1].length;

  const dpArr = Array.from(Array(n), () => Array(m).fill(0));

  if (n === 1) {
    return triangle[0][0];
  }

  dpArr[n - 1] = Array.from(triangle[n - 1]);

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dpArr[i][j] =
        Math.max(dpArr[i + 1][j], dpArr[i + 1][j + 1]) + triangle[i][j];
    }
  }

  answer = dpArr[0][0];
  return answer;
}
