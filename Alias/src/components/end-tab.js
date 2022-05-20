export const EndTab = ({ nextPage }) => (
  <>
    <div id="end-side" className="side display">
      <div className="top-card-container">
        <h1>
          Round Over!<hr></hr>
        </h1>
      </div>
      <div className="center-card-container justify-content-flex-start">
        <span className="span-end" id="span-end"></span>
        <ul id="ul-end" className="game-ul"></ul>
      </div>
      <div className="bottom-card-container">
        <button id="button-end" className="bottom-button" onClick={nextPage}>
          <span>To Leaderboard</span>
        </button>
      </div>
    </div>
  </>
);
