import wordsPack, { dices, teamPlaceholders } from "./data.js";
import { MainMenu } from "./components/main-menu.js";
import { TeamsTab } from "./components/teams-tab.js";
import { SettingsTab } from "./components/settings-tab.js";
import { WordsTab } from "./components/words-tab.js";
import { GameTab } from "./components/game-tab.js";
import { EndTab } from "./components/end-tab.js";
import { LeaderboardTab } from "./components/Leaderboard-tab.js";
import { Login } from "./components/login.js";
import { RulesTab, RulesButton } from "./components/rules.js";
import {
  signInWithEmail,
  signUpWithEmail,
  monitorAuthState,
  redirectGoogleSignUp,
  signOutFromApp,
  fetchGameData,
  backUpGameData,
  deleteSavedGame,
} from "./server.js";
import "./styles/rules.css";
import "./styles/settings.css";
import "./styles/teams.css";
import "./styles/themes.css";
import "./styles/login.css";
import "./style.css";
let userData = {
  id: "",
  name: "",
  hasSavedGame: false,
  isSignedIn: false,
};

let gameData = {
  teams: [],
  teamNum: 0,
  timeLimit: 90,
  wordLimit: 30,
  wordNum: 0,
  wordsIndex: 0,
};
let sideNum = 0;
let teamCounter = 2;
let wordsIndex = 0;

let wordsEnd = [];

let scoreNum = 0;

window.addEventListener(`load`, function () {
  // Theme switch
  document
    .getElementById(`button-header`)
    .addEventListener(`click`, function () {
      document.documentElement.className =
        document.documentElement.className === `theme-green`
          ? `theme-dark`
          : `theme-green`;
    });

  // Rules || Yes   Start || No
  addOnClick(`button-top`, function () {
    if (sideNum == 0) {
      getSide(1, `rules-side`, `rotateY(180deg)`, RenderRules);
      document.getElementById(`span-top`).innerHTML = `Menu`;
    } else if (sideNum == 1) {
      getSide(0, `main-side`, `rotateY(180deg)`, RenderNavMenu);
      document.getElementById(`span-top`).innerHTML = `Rules`;
    } else {
      getNextWord(`Yes`);
    }
  });

  addOnClick(`button-bottom`, function () {
    if (sideNum < 2 && checkTeam()) {
      getSide(2, `score-side`, `rotateY(180deg)`, RenderLeaderBoard);
      loadLeaderboard();
      document.querySelectorAll(`.border-button`).forEach((element) => {
        element.style.opacity = 0;
        setTimeout(() => {
          element.classList.add(`display-none`);
        }, 300);
      });
    } else {
      getNextWord(`No`);
    }
  });
  // Leaderboard

  // End
});

const setUserData = (newData) => {
  userData = JSON.parse(JSON.stringify(newData));
};

const setGameData = (newData) => {
  gameData = JSON.parse(JSON.stringify(newData));
  loadLeaderboard();
};

const addOnClick = (id, callback) => {
  document.getElementById(id).removeEventListener("click", callback);
  document.getElementById(id).addEventListener("click", callback);
};

const mainContainer = document.getElementById("main-card");

const RenderLogin = () => {
  toggleButtons("none");
  mainContainer.innerHTML = Login();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  addOnClick("sign-in", () => signInWithEmail(email.value, password.value));
  addOnClick("sign-up", () => signUpWithEmail(email.value, password.value));
  addOnClick("sign-in-with-google", () => redirectGoogleSignUp());
};
const RenderNavMenu = () => {
  toggleButtons("block");
  mainContainer.innerHTML = MainMenu();

  // Update content && Color onclick navbar
  document.getElementById(`teams-li`).addEventListener(`click`, function () {
    RenderTeamsMenu();
  });
  document.getElementById(`settings-li`).addEventListener(`click`, function () {
    RenderSettingsMenu();
  });
  document.getElementById(`words-li`).addEventListener(`click`, function () {
    RenderWordsMenu();
  });

  document.getElementById("span-bottom").textContent = "Start";
  RenderTeamsMenu();
};

const RenderTeamsMenu = () => {
  let mainSide = document.getElementById("main-tab");

  mainSide.innerHTML = TeamsTab();
  // Teams
  document
    .getElementById(`button-teams-add`)
    .addEventListener(`click`, addTeam);
};

const RenderSettingsMenu = () => {
  let mainSide = document.getElementById("main-tab");
  mainSide.innerHTML = SettingsTab();
  addOnClick(`button-time-sub`, function () {
    changeTimeCounter(false);
  });
  addOnClick(`button-time-add`, function () {
    changeTimeCounter(true);
  });
  addOnClick(`button-words-sub`, function () {
    changeWordCounter(false);
  });
  addOnClick(`button-words-add`, function () {
    changeWordCounter(true);
  });

  addOnClick(`button-logout`, () => {
    setUserData({
      id: "",
      name: "",
      hasSavedGame: false,
      isSignedIn: false,
    });
    signOutFromApp();
    RenderLogin();
  });
};

const RenderWordsMenu = () => {
  let mainSide = document.getElementById("main-tab");
  mainSide.innerHTML = WordsTab();
  loadWords();
  document
    .getElementById(`button-words-left`)
    .addEventListener(`click`, function () {
      switchWords(false);
    });
  document
    .getElementById(`button-words-right`)
    .addEventListener(`click`, function () {
      switchWords(true);
    });
};

const RenderRules = () => {
  mainContainer.innerHTML = RulesTab();
  document
    .getElementById(`button-rules-back`)
    .addEventListener(`click`, function () {
      getSide(0, `main-side`, `rotateY(180deg)`, RenderNavMenu);
      document.getElementById(`span-top`).innerHTML = `Rules`;
    });
};

const RenderLeaderBoard = () => {
  mainContainer.innerHTML = LeaderboardTab();
  document
    .getElementById(`button-leaderboard`)
    .addEventListener(`click`, function () {
      document.getElementById(`h2-time`).innerHTML =
        gameData.timeLimit.toString();
      document.getElementById(`h2-points`).innerHTML = `0`;
      getSide(3, `game-side`, `rotateY(180deg)`, RenderGame);
      loadGame();
      gameTimer();
    });
};

const RenderGame = () => {
  mainContainer.innerHTML = GameTab();
  toggleButtons("block");
};

const RenderEnd = () => {
  mainContainer.innerHTML = EndTab();
  document.getElementById(`button-end`).addEventListener(`click`, function () {
    updateTeams();
    scoreNum = 0;
    document.getElementById(`h2-points`).innerHTML = scoreNum.toString();
  });
};
// Teams
function addTeam() {
  if (teamCounter < 6) {
    let strInnerHtml = `   
            <i class="fas fa-dice-${dices[teamCounter - 2]}"></i>
            <input name="input-team" placeholder="${
              teamPlaceholders[teamCounter - 2]
            }">
            <i id = button-remove-team${teamCounter} class="fas fa-times""></i>
            `;
    let inputDiv = document.createElement(`div`);
    inputDiv.setAttribute(`class`, `teams-input dice`);
    inputDiv.innerHTML = strInnerHtml;

    document.getElementById(`teams-input-container`).appendChild(inputDiv);
    let buttonRemoveTeam = document.getElementById(
      `button-remove-team${teamCounter}`
    );
    buttonRemoveTeam.addEventListener(
      "click",
      function () {
        removeTeam(this);
      },
      false
    );
    teamCounter += 1;
  }
}

function removeTeam(element) {
  element.parentNode.remove();

  let containers = document.querySelectorAll(`.dice`);
  for (let i = 0; i < teamCounter - 3; i++) {
    let iDice = containers.item(i).children.item(0);
    let inputTeam = containers.item(i).children.item(1);

    iDice.setAttribute(`class`, `fas fa-dice-${dices[i]}`);
    inputTeam.setAttribute(`placeholder`, `${teamPlaceholders[i]}`);
  }
  teamCounter -= 1;
}

function checkTeam() {
  let teamNames = [];
  document.getElementsByName(`input-team`).forEach((element) => {
    teamNames.push(element.value);
  });
  if (teamNames.length != 0) gameData.teams = [];
  for (let i = 0; i < teamNames.length; i++) {
    name = teamNames[i];
    if (name.length < 3) {
      alert(`Team name: length must be at least 3!`);
      return false;
    } else if (name.length > 10) {
      alert(`Team name: length must be no more then 10!`);
      return false;
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      alert(`Team name: only english letters allowed!`);
      return false;
    }
    gameData.teams.push({ name: name, score: 0 });
  }
  return true;
}
// Settings
function changeTimeCounter(isAdd) {
  if (gameData.timeLimit < 300 && isAdd) {
    gameData.timeLimit += 30;
  } else if (gameData.timeLimit > 30 && !isAdd) {
    gameData.timeLimit -= 30;
  } else return;

  document.getElementById(`minutes-counter`).innerHTML = Math.trunc(
    gameData.timeLimit / 60
  ).toString();
  document.getElementById(`seconds-counter`).innerHTML =
    gameData.timeLimit % 60 == 0
      ? ":00"
      : ":" + (gameData.timeLimit % 60).toString();
}
function changeWordCounter(isAdd) {
  if (gameData.wordLimit < 200 && isAdd) {
    gameData.wordLimit += 10;
  } else if (gameData.wordLimit > 10 && !isAdd) {
    gameData.wordLimit -= 10;
  } else return;

  document.getElementById(`words-counter`).innerHTML =
    gameData.wordLimit.toString();
}
// Words
function switchWords(isRight) {
  wordsIndex = isRight
    ? ++wordsIndex % wordsPack.size
    : (wordsPack.size + wordsIndex - 1) % wordsPack.size;
  animationWords(isRight);
  loadWords();
}

function toggleButtons(style) {
  var buttonTop = document.getElementById("button-top");
  var buttonBottom = document.getElementById("button-bottom");
  buttonTop.style.display = style;
  buttonBottom.style.display = style;
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

// Update Content
function loadWords() {
  let description = ``;
  let words = wordsPack.get(wordsIndex);

  document.getElementById(`h1-words-topic`).innerHTML = words[0].toString();
  for (let i = 0; i < 3 && i < words[1].length; i++) {
    description += `${words[1][i]}, `;
  }
  document.getElementById(`p-words-description`).innerHTML =
    description + `...`;
}
function loadLeaderboard() {
  let container = document.getElementById(`ul-teams`);
  container.innerHTML = "";
  for (let team of gameData.teams) {
    let strInnerHtml = `
            <h2>Team '${team.name}'</h2>
            <h3>${team.score}</h3>
            `;
    let li = document.createElement(`li`);
    li.innerHTML = strInnerHtml;
    container.appendChild(li);
  }

  document.getElementById(`span-leaderboard`).innerHTML = `Turn '${
    gameData.teams[gameData.teamNum].name
  }'`;
}
function loadGame() {
  document.getElementById(`article-word`).innerHTML =
    wordsPack.get(wordsIndex)[1][gameData.wordNum];
  if (gameData.wordNum + 1 == wordsPack.get(wordsIndex)[1].length) {
    wordsPack.get(wordsIndex)[1].sort(() => Math.random() - 0.5);
    gameData.wordNum = 0;
  } else {
    gameData.wordNum += 1;
  }

  document.getElementById(`span-top`).innerHTML = `Yes`;
  document.getElementById(`span-bottom`).innerHTML = `No`;

  document.querySelectorAll(`.border-button`).forEach((element) => {
    element.classList.remove(`display-none`);
    setTimeout(() => {
      element.style.opacity = 1;
    }, 100);
  });
  document.querySelectorAll(`.header-counter`).forEach((element) => {
    element.style.opacity = 1;
  });
}
function loadEnd() {
  document.getElementById(`span-end`).innerHTML = scoreNum.toString();
  let container = document.getElementById(`ul-end`);
  container.innerHTML = "";

  for (let i in wordsEnd) {
    let strInnerHtml = `
            <h2>${wordsEnd[i][0]}</h2>
            <div>
                <i id = "button-change-res-yes${i}" class="fa${
      wordsEnd[i][1] === `Yes` ? `s` : `r`
    } fa-check-circle"></i>
                <i  id = "button-change-res-no${i}" class="fa${
      wordsEnd[i][1] === `No` ? `s` : `r`
    } fa-times-circle"></i>
                <i  id = "button-change-res-none${i}" class="fa${
      wordsEnd[i][1] === `None` ? `s` : `r`
    } fa-minus-square"></i>
            </div>
            `;
    let li = document.createElement(`li`);
    li.innerHTML = strInnerHtml;

    container.appendChild(li);
  }

  for (let i in wordsEnd) {
    document.getElementById(`button-change-res-yes${i}`).addEventListener(
      "click",
      function () {
        changeWordRes(this, `${wordsEnd[i][0]}`, "Yes");
      },
      false
    );
    document.getElementById(`button-change-res-no${i}`).addEventListener(
      "click",
      function () {
        changeWordRes(this, `${wordsEnd[i][0]}`, "No");
      },
      false
    );
    document.getElementById(`button-change-res-none${i}`).addEventListener(
      "click",
      function () {
        changeWordRes(this, `${wordsEnd[i][0]}`, "None");
      },
      false
    );
  }

  document.querySelectorAll(`.border-button`).forEach((element) => {
    element.style.opacity = 0;
    setTimeout(() => {
      element.classList.add(`display-none`);
    }, 300);
  });
  document.querySelectorAll(`.header-counter`).forEach((element) => {
    element.style.opacity = 0;
  });
}

// Game Logic
function gameTimer() {
  let seconds = gameData.timeLimit - 1;
  let container = document.getElementById(`h2-time`);

  let timerId = setInterval(() => {
    container.innerHTML = seconds.toString();
    seconds -= 1;
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
    getNextWord(`None`);
    getSide(4, `end-side`, `rotateY(180deg)`, RenderEnd);
    loadEnd();
  }, (gameData.timeLimit + 1) * 1000);
}
function getNextWord(result) {
  scoreNum =
    result === `Yes` ? scoreNum + 1 : result === `No` ? scoreNum - 1 : scoreNum;
  document.getElementById(`h2-points`).innerHTML = scoreNum.toString();
  gameData.wordNum += 1;
  wordsEnd.push([wordsPack.get(wordsIndex)[1][gameData.wordNum], result]);
  if (gameData.wordNum + 1 == wordsPack.get(wordsIndex)[1].length) {
    wordsPack.get(wordsIndex)[1].sort(() => Math.random() - 0.5);
    gameData.wordNum = 0;
  }
  let container = document.getElementById(`article-word`);
  //container.style.transform = result === `Yes` ? `rotate(360deg)` : `rotate(-360deg)`
  container.style.opacity = 0;

  setTimeout(() => {
    container.innerHTML = wordsPack.get(wordsIndex)[1][gameData.wordNum];
    container.style.opacity = 1;
  }, 300);
}
function changeWordRes(i, word, res) {
  let index = wordsEnd.findIndex((currentValue) => currentValue[0] === word);
  if (wordsEnd[index][1] !== res) {
    i.parentElement.querySelectorAll(`.fas`).forEach((element) => {
      element.classList.replace(`fas`, "far");
    });
    i.classList.replace(`far`, `fas`);

    wordsEnd[index][1] = res;
    updateScore();
    document.getElementById(`span-end`).innerHTML = scoreNum.toString();
  }
}
function updateScore() {
  scoreNum = 0;
  for (let i in wordsEnd) {
    if (wordsEnd[i][1] === `Yes`) {
      scoreNum += 1;
    } else if (wordsEnd[i][1] === `No`) {
      scoreNum -= 1;
    }
  }
}
function updateTeams() {
  updateScore();
  backUpGameData(userData, gameData);
  gameData.teams[gameData.teamNum].score += scoreNum;

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
      getSide(0, `main-side`, `rotateY(180deg)`, RenderNavMenu);
      document.getElementById(`span-top`).innerHTML = `Rules`;
      var buttonTop = document.getElementById("button-top");
      var buttonBottom = document.getElementById("button-bottom");
      buttonTop.classList.remove("display-none");
      buttonTop.style.opacity = 1;
      buttonBottom.classList.remove("display-none");
      buttonBottom.style.opacity = 1;
      return;
    }
  }
  gameData.teamNum = (1 + gameData.teamNum) % gameData.teams.length;
  wordsEnd = [];
  getSide(2, `score-side`, `rotateY(180deg)`, RenderLeaderBoard);
  loadLeaderboard();
}

function getSide(toSide, sideId, transform, action = () => {}) {
  document.getElementById(`main-card`).style.transform = transform;
  action();
  setTimeout(() => {
    //onclickUpdateState(`.side`, sideId, `display-none`, `display`)

    document.getElementById(`main-card`).style.transform = `rotateY(0deg)`;
    sideNum = toSide;
  }, 150);
}

const userSaved = () => {
  if (userData.isSignedIn) {
    if (!userData.hasSavedGame) {
      RenderNavMenu();
    } else {
      fetchGameData(userData.id, setGameData);
      getSide(2, `score-side`, `rotateY(180deg)`, RenderLeaderBoard);

      document.querySelectorAll(`.border-button`).forEach((element) => {
        element.style.opacity = 0;
        setTimeout(() => {
          element.classList.add(`display-none`);
        }, 300);
      });
    }
  }
};

RenderLogin();
monitorAuthState(setUserData, () => userSaved());
