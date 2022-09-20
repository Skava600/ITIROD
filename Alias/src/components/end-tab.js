import {
  backUpGameData,
  deleteSavedGame,
} from "../server.js";

export const EndTab = ({ 
  userData,
  gameData,
  roundData,
  prevPage,
  nextPage }) =>
  { 
    const Word = (props) =>{
      return <li><h2>{props.text}</h2>
      <div>

          <i id = {props.id.toString().concat('button-change-res-yes')} 
          onClick = {() => {
            changeWordRes(props.id, "Yes");
          }
          }
          class={"fa".concat(props.answer === `Yes` ? `s` : `r`, " fa-check-circle")}></i>

          <i id = {props.id.toString().concat('button-change-res-no')} 
          onClick = {() => {
            changeWordRes(props.id, "No")
          }
        }
          class={"fa".concat(props.answer === `No` ? `s` : `r`,
     " fa-times-circle")}></i>

          <i  id = {props.id.toString().concat("button-change-res-none")} 
           onClick = {() => {
             changeWordRes(props.id, "None")
           }
          }
          class= {"fa".concat(props.answer === `None` ? `s` : `r`, " fa-minus-square")
          }></i>

      </div>
      </li>
    }
    
    function changeWordRes(id, res) {
      if (roundData.swipedWords[id][1] !== res) {
        let el =  document.getElementById(`${id}button-change-res-${res.toLowerCase()}`)
        el.parentElement.querySelectorAll(`.fas`).forEach((element) => {
          element.classList.replace(`fas`, "far");
        });
        el.classList.replace(`far`, `fas`);
    
        roundData.swipedWords[id][1] = res;
        updateScore()
        document.getElementById(`span-end`).innerHTML = roundData.scoreNum.toString();
      }
    }

    function updateScore() {
      roundData.scoreNum = 0;
      for (let i in roundData.swipedWords) {
        if (roundData.swipedWords[i][1] === `Yes`) {
          roundData.scoreNum += 1;
        } else if (roundData.swipedWords[i][1] === `No`) {
          roundData.scoreNum -= 1;
        }
      }
    }

    const SaveRoundResult = () =>{
      gameData.teams[gameData.teamNum].score += roundData.scoreNum;
      
      if (gameData.teamNum == gameData.teams.length - 1) {
        let teamMaxKey = 0;
        let scoreMax = 0;
        for (let i = 0; i < gameData.teams.length; i++) {
          if (scoreMax < gameData.teams[i].score) {
            scoreMax = gameData.teams[i].score;
            teamMaxKey = i;
          }
        }
        if (scoreMax != 0 && scoreMax >= gameData.wordLimit) {
          alert(`Победила команда ${gameData.teams[teamMaxKey].name}`);
          deleteSavedGame(userData);
          prevPage();
          return;
        }
  }
      gameData.teamNum = (1 + gameData.teamNum) % gameData.teams.length;
      backUpGameData(userData, gameData);
    }

    return (
  <>
    <div id="end-side" className="side display">
      <div className="top-card-container">
        <h1>
          Round Over!<hr></hr>
        </h1>
      </div>
      <div className="center-card-container justify-content-flex-start">
        <span className="span-end" id="span-end">{roundData.scoreNum}</span>
        <ul id="ul-end" className="game-ul">
          {roundData.swipedWords.map((word, i = 0) => <Word text = {word[0]} answer = {word[1]} id = {i++}/>)}
        </ul>
      </div>
      <div className="bottom-card-container">
        <button id="button-end" className="bottom-button" onClick={() => {
          SaveRoundResult()
          nextPage()
        }
        }>
          <span>To Leaderboard</span>
        </button>
      </div>
    </div>
  </>
)}
