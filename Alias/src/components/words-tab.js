import { MainMenu } from "./main-menu";
import wordsPack from "../data";
export const WordsTab = ({
  gameData,
  updateGameData,
  prevPage,
  nextPage,
  setPage,
}) => {
  function loadPackName() {
    let words = wordsPack.get(gameData.wordsIndex);
    return words[0].toString();
  }

  function loadPackDescription() {
    let words = wordsPack.get(gameData.wordsIndex);
    let description = ``;
    for (let i = 0; i < 3 && i < words[1].length; i++) {
      description += `${words[1][i]}, `;
    }
    return description + `...`;
  }

  const switchDictionaries = (isRight) =>
  {
    gameData.wordsIndex = isRight
    ? ++gameData.wordsIndex % wordsPack.size
    : (wordsPack.size + gameData.wordsIndex - 1) % wordsPack.size;
  animationWords(isRight);
  loadWords();
  }

  function animationWords(isRight) {
    let container = document.getElementById(`words-card`);
    container.style.transition = `transform 0.5s`;
    container.style.transform = isRight ? `rotate(360deg)` : `rotate(-360deg)`;
    setTimeout(() => {
      container.style.transition = `transform 0s`;
      container.style.transform = `rotate(0deg)`;
    }, 500);
  }

  function loadWords() {
    let description = ``;
    let words = wordsPack.get(gameData.wordsIndex);
  
    document.getElementById(`h1-words-topic`).innerHTML = words[0].toString();
    for (let i = 0; i < 3 && i < words[1].length; i++) {
      description += `${words[1][i]}, `;
    }
    document.getElementById(`p-words-description`).innerHTML =
      description + `...`;
  }

  return (
    <>
      <div id="main-side" className="side display">
        {<MainMenu setPage={setPage} />}
        <div
          id="words-tab"
          className="tab center-card-container flex-direction-row display"
        >
          <div className="words-col-border">
            <button className="word-arrow-button" id="button-words-left" onClick={() => switchDictionaries(false)}>
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          <div className="words-col-center">
            <div id="words-card" className="words-card">
              <h1 className="word-h1" id="h1-words-topic">
                {loadPackName()}
              </h1>
              <p className="word-p" id="p-words-description">
                {loadPackDescription()}
              </p>
            </div>
          </div>
          <div className="words-col-border">
            <button className="word-arrow-button" id="button-words-right"  onClick={() => switchDictionaries(true)}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
