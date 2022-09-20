import wordsPack from "../data";

export const getNextWord = (result, gameData, roundData) => {
  roundData.scoreNum =
    result === `Yes`
      ? roundData.scoreNum + 1
      : result === `No`
      ? roundData.scoreNum - 1
      : roundData.scoreNum;

  gameData.wordNum += 1;
  roundData.swipedWords.push([
    wordsPack.get(gameData.wordsIndex)[1][gameData.wordNum],
    result,
  ]);
  if (gameData.wordNum + 1 == wordsPack.get(gameData.wordsIndex)[1].length) {
    wordsPack.get(gameData.wordsIndex)[1].sort(() => Math.random() - 0.5);
    gameData.wordNum = 0;
  }
  let container = document.getElementById(`article-word`);
  let scoreElement = document.getElementById(`h2-points`);
  scoreElement.textContent = roundData.scoreNum;
  container.style.opacity = 0;

  setTimeout(() => {
    container.innerHTML = wordsPack.get(gameData.wordsIndex)[1][
      gameData.wordNum
    ];
    container.style.opacity = 1;
  }, 300);
};

export const GameTab = ({
  gameData,
  updateGameData,
  prevPage,
  nextPage,
  setPage,
}) => {
  let timeLeft = gameData.timeLimit;

  const timerElement = document.getElementById("h2-time");
  const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(timer);
      setTimeout(() => {
        nextPage();
      }, 500);
    }
    timerElement.textContent = timeLeft;
  }, 1000); 
  return (
      <div id="game-side" className="side display">
        <article id="article-word" className="card-word">
          Lets Start!
        </article>
      </div>
  );
};
