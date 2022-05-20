export const LeaderboardTab = ({
  gameData,
  updateGameData,
  prevPage,
  nextPage,
  setPage,
}) => {
  const { teams, teamNum } = gameData;
  return (
    <>
      <div id="score-side" className="side display">
        <div className="top-card-container">
          <h1>
            Leaderboard<hr></hr>
          </h1>
        </div>
        <div className="center-card-container justify-content-center">
          <ul id="ul-teams" className="game-ul">
            {teams.map((team, index) => (
              <li>
                <h2>Team {team.name}</h2>
                <h3>{team.score}</h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom-card-container">
          <button
            id="button-leaderboard"
            className="bottom-button"
            onClick={nextPage}
          >
            <span id="span-leaderboard">Turn {teams[teamNum].name}</span>
          </button>
        </div>
      </div>
    </>
  );
};
