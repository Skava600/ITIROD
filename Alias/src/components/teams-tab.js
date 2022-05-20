import { MainMenu } from "./main-menu";
import { BotButton, TopButton } from "./top-bottom-buttons";
import { dices } from "../data";
export const TeamsTab = ({
  gameData,
  nextPage,
  prevPage,
  updateGameData,
  setPage,
}) => {
  const { teams } = gameData;
  const deleteTeam = (index) => {
    updateGameData({
      teams: [...teams.slice(0, index), ...teams.slice(index + 1)],
    });
  };

  const updateTeamByIndex = (index, obj) => {
    const team = { ...teams[index], ...obj };
    updateGameData({
      teams: [...teams.slice(0, index), team, ...teams.slice(index + 1)],
    });
  };

  const addTeam = () => {
    if (teams.length < 6) {
      updateGameData({
        teams: [...teams, { name: "", points: 0 }],
      });
    }
  };
  return (
    <>
      <div id="main-side" className="side display">
        {<MainMenu setPage={setPage} />}
        <div id="teams-tab" className="tab display fill">
          <div id="teams-input-container" className="center-card-container">
            {teams.map((team, index, array) => {
              let dicenName = `fas fa-dice-${dices[index]}`;
              return (
                <div className="teams-input">
                  <i className={dicenName}></i>
                  <input
                    name="input-team"
                    onChange={(e) =>
                      updateTeamByIndex(index, { name: e.target.value })
                    }
                    placeholder="Team Name"
                    value={teams[index].name}
                    maxLength="8"
                  ></input>
                  <i
                    className="fas fa-times"
                    onClick={() => deleteTeam(index)}
                  ></i>
                </div>
              );
            })}
          </div>
          <div className="bottom-card-container">
            <button
              id="button-teams-add"
              className="bottom-button"
              onClick={addTeam}
            >
              <span>Add New Team</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
