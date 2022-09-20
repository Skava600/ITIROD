import { pages } from "../consts/pages";
import { rotateMainCard } from "../App";
import { getNextWord } from "./game-tab";

export const TopButton = ({ pageCode, sharedProps, handleClick }) => {
  const { teams, teamNum } = sharedProps.gameData;
  const getText = () => {
    let result;
  
    switch (pageCode) {
      case pages.TeamsTab.code:
        result = "Rules";
       
        break;
      case pages.GameTab.code:
        result = "Yes";
        break;
      default:
        result = "";
        break;
    }

    return result;
  };

  const getOnClick = () => {
    //handleClick()
    switch (pageCode) {
      case pages.TeamsTab.code:
        {
          rotateMainCard("rotateY(180deg)", sharedProps.prevPage);
        }
        break;
      case pages.GameTab.code: {
        getNextWord("Yes", sharedProps.gameData, sharedProps.roundData);
      }
      default: {
      }
    }
  };

  return (
    <>
      <div className="border-row border-top-radius">
        <button
          id="button-top"
          className="border-button border-radius-top"
          onClick={getOnClick}
        >
          <span className="border-button-span" id="span-top">
            {getText()}
          </span>
        </button>
      </div>
    </>
  );
};
export const BotButton = ({ pageCode, sharedProps }) => {
  const getOnClick = () => {
    switch (pageCode) {
      case pages.TeamsTab.code:
        sharedProps.nextPage();
        break;
      case pages.GameTab.code: {
        getNextWord("No", sharedProps.gameData, sharedProps.roundData);
      }
      default: {
      }
    }
  };
  const getText = () => {
    let result;
    switch (pageCode) {
      case pages.TeamsTab.code:
        result = "Start";
        break;
      case pages.GameTab.code:
        result = "No";
        break;
      default:
        result = "";
        break;
    }

    return result;
  };
  return (
    <>
      <div className="border-row border-bottom-radius align-items-flex-end">
        <button
          id="button-bottom"
          className="border-button border-bottom-radius"
          onClick={getOnClick}
        >
          <span className="border-button-span" id="span-bottom">
            {getText()}
          </span>
        </button>
      </div>
    </>
  );
};
