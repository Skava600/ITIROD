import { MainMenu } from "./main-menu";
import { signOutFromApp } from "../server";
import { pages } from "../consts/pages";


export const SettingsTab = ({
  gameData,
  updateGameData,
  prevPage,
  nextPage,
  setPage,
}) => {
  const { wordLimit, timeLimit } = gameData;
  function changeTimeCounter(isAdd) {
    if (gameData.timeLimit < 300 && isAdd) {
      updateGameData({ timeLimit: timeLimit + 30 });
    } else if (gameData.timeLimit > 30 && !isAdd) {
      updateGameData({ timeLimit: timeLimit - 30 });
    } else return;
  }
  function changeWordCounter(isAdd) {
    if (gameData.wordLimit < 200 && isAdd) {
      updateGameData({ wordLimit: wordLimit + 10 });
      gameData.wordLimit += 10;
    } else if (gameData.wordLimit > 10 && !isAdd) {
      updateGameData({ wordLimit: wordLimit - 10 });
    } else return;
  }

  const signOutClick = () =>
{
  signOutFromApp();
  setPage(pages.Login.code)
}
  return (
    <>
      <div id="main-side" className="side display">
        {<MainMenu setPage={setPage} />}
        <div id="settings-tab" className="tab settings-container display">
          <div className="settings-row">
            <div className="settings-col-info">
              <h2>Round Time:</h2>
              <h3>For which you must guess the words</h3>
              <div className="settings-row-buttons">
                <button
                  id="button-time-sub"
                  className="settings-button margin-right"
                  onClick={() => changeTimeCounter(false)}
                >
                  -30 sec.
                </button>
                <button
                  id="button-time-add"
                  className="settings-button"
                  onClick={() => changeTimeCounter(true)}
                >
                  +30 sec.
                </button>
              </div>
            </div>
            <div id="settings-col-time" className="settings-col-value">
              <h2 id="minutes-counter">
                {" "}
                {Math.trunc(timeLimit / 60).toString()}
              </h2>
              <h3 id="seconds-counter">
                {timeLimit % 60 == 0
                  ? ":00"
                  : ":" + (timeLimit % 60).toString()}
              </h3>
              <h3>min</h3>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-col-info">
              <h2>Word Limit:</h2>
              <h3>Necessary for victor</h3>
              <div className="settings-row-buttons">
                <button
                  id="button-words-sub"
                  className="settings-button margin-right"
                  onClick={() => changeWordCounter(false)}
                >
                  -10 words.
                </button>
                <button
                  id="button-words-add"
                  className="settings-button"
                  onClick={() => changeWordCounter(true)}
                >
                  +10 words.
                </button>
              </div>
            </div>
            <div className="settings-col-value">
              <h2 id="words-counter">{wordLimit}</h2>
            </div>
          </div>
          <div className="bottom-card-container">
            <button
              id="button-logout"
              className="bottom-button"
              onClick={signOutClick}
            >
              <span>LogOut</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
