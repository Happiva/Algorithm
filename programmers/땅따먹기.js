function solution(land) {
  var answer = -Infinity;
  const dp = new Array(land.length);

  for (let i = 0; i < dp.length; i++) {
    if (i === 0) dp[i] = land[0];
    else {
      const newArr = new Array(4);
      dp[i] = newArr;
    }
  }
  if (land.length > 1) {
    for (let i = 1; i < land.length; i++) {
      for (let j = 0; j < 4; j++) {
        let max = 0;
        for (let k = 0; k < 4; k++) {
          if (j !== k) max = Math.max(max, dp[i - 1][k]);
        }
        dp[i][j] = max + land[i][j];
      }
    }
  }

  dp[land.length - 1].forEach((el) => (answer = Math.max(answer, el)));

  return answer;
}
