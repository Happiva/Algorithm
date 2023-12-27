function solution(storey) {
  const numberArr = storey
    .toString()
    .split("")
    .map((el) => parseInt(el));
  let answer = 0;

  for (let i = numberArr.length - 1; i >= 0; i--) {
    const num = numberArr[i];

    if (num > 5) {
      answer += 10 - num;

      if (i === 0) {
        answer++;
      } else numberArr[i - 1]++;
    } else if (num === 5 && numberArr[i - 1] >= 5 && i > 0) {
      answer += num;
      numberArr[i - 1]++;
    } else {
      answer += numberArr[i];
    }
  }

  return answer;
}
