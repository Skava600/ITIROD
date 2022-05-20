import { MainMenu } from "./main-menu";
import wordsPack from "../data";
export const WordsTab = ({
  gameData,
  updateGameData,
  prevPage,
  nextPage,
  setPage,
}) => {
  const { wordsIndex } = gameData;
  function loadPackName() {
    let words = wordsPack.get(wordsIndex);
    return words[0].toString();
  }

  function loadPackDescription() {
    let words = wordsPack.get(wordsIndex);
    let description = ``;
    for (let i = 0; i < 3 && i < words[1].length; i++) {
      description += `${words[1][i]}, `;
    }
    return description + `...`;
  }
  return (
    <>
      <div id="main-side" className="side display">
        {<MainMenu setPage={setPage} />}
        <div
          id="words-tab"
          className="tab center-card-container flex-direction-row display fill"
        >
          <div className="words-col-border">
            <button className="word-arrow-button" id="button-words-left">
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
            <button className="word-arrow-button" id="button-words-right">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
