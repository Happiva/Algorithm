const words = ["A", "E", "I", "O", "U"];

function solution(word) {
  var num = 0;
  var answer = 0;

  const dfs = (str) => {
    if (answer != 0) return;
    if (str === word) {
      answer = num;
      return;
    }

    if (str.length < 5) {
      for (let i = 0; i < 5; i++) {
        dfs(str + words[i], ++num);
      }
    }
  };
  dfs("", 0);

  return answer;
}
