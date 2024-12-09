function solution(video_len, pos, op_start, op_end, commands) {
  var answer = "";

  const convertTimeToSec = (timeStr) => {
    const [m, s] = timeStr.split(":").map((el) => parseInt(el));
    return m * 60 + s;
  };

  let current = convertTimeToSec(pos);
  const runningTime = convertTimeToSec(video_len);
  const openingStart = convertTimeToSec(op_start);
  const openingEnd = convertTimeToSec(op_end);

  const moveToPrev = () => {
    if (current < 10) current = 0;
    else current -= 10;
  };

  const moveToNext = () => {
    if (runningTime - current < 10) current = runningTime;
    else current += 10;
  };

  const skipOpening = () => {
    if (openingStart <= current && current <= openingEnd) current = openingEnd;
  };

  for (let i = 0; i < commands.length; i++) {
    skipOpening();
    const command = commands[i];

    if (command === "prev") moveToPrev();
    else if (command === "next") moveToNext();
  }
  skipOpening();

  answer =
    Math.floor(current / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (current % 60).toString().padStart(2, "0");

  return answer;
}
