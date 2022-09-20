import { useEffect, useState, useRef } from "react";
import { BotButton, TopButton } from "./components/top-bottom-buttons";
import { pages } from "./consts/pages";
import { Header } from "./components/header.js";
import wordsPack, { dices, teamPlaceholders } from "./data.js";
import { RulesTab, RulesButton } from "./components/rules.js";
import { DEFAULT_USER_DATA, getDefaultGameData } from "./consts/game-consts.js";
import { backUpGameData, monitorAuthState } from "./server";
import "./styles/rules.css";
import "./styles/settings.css";
import "./styles/teams.css";
import "./styles/themes.css";
import "./styles/login.css";
import "./style.css";
import { Login } from "./components";
export const rotateMainCard = (transform, action) => {
  document.getElementById(`main-card`).style.transform = transform;
  action();
  setTimeout(() => {
    document.getElementById(`main-card`).style.transform = `rotateY(0deg)`;
  }, 150);
};
const App = () => {
  const [userData, setUserData] = useState({
    ...DEFAULT_USER_DATA,
  });
  const [gameData, setGameData] = useState(getDefaultGameData());
  const [roundData, setRoundData] = useState({
    swipedWords: [],
    lastWordTeamId: 0,
    scoreNum: 0,
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [pageCode, setPageCode] = useState(pages.Login.code);
  const page = pages[pageCode];

  const sharedProps = {
    userData,
    gameData,
    roundData,
    updateUserData: (newValue) =>
      setUserData((prevValue) => ({ ...prevValue, ...newValue })),
    updateGameData: (newValue) =>
      setGameData((prevValue) => ({ ...prevValue, ...newValue })),
    nextPage: () => {
      setPageCode(page.nextPageCode);
    },
    updateRoundData: (newValue) =>
      setRoundData((prevValue) => {
        return { ...prevValue, ...newValue };
      }),
    prevPage: () => setPageCode(page.prevPageCode),
    setPage: (pageCode) => setPageCode(pageCode),
    setEmail: (email) => setEmail(email),
    setPassword: (password) => setPassword(password),
    email,
    password
  };

  useEffect(() => {
    setRoundData({
      swipedWords: [],
      lastWordTeamId: 0,
      scoreNum: 0,
    });
    monitorAuthState(setUserData, setGameData, setPageCode);
  }, []);

  const changeTheme = () => {
    document.documentElement.className =
      document.documentElement.className === `theme-green`
        ? `theme-dark`
        : `theme-green`;
  };


  useEffect(() => {
    switch (page.code) {
      case pages.GameTab.code:
        setRoundData({
          swipedWords: [],
          lastWordTeamId: 0,
          scoreNum: 0,
        });
        break;
    }
  }, [page.code]);


  return (
    <>
      <header>
        {<Header changeTheme={changeTheme} sharedProps={sharedProps} />}
      </header>
      <main>
        {page.topAndBotButtons && (
          <TopButton pageCode={page.code} sharedProps={sharedProps} handleClick={null}></TopButton>
        )}
        <div className="center-row">
          <div id="main-card" className="main-card">
            <div id="main-side" className="side display">
              {page.component({ ...sharedProps })}
            </div>
          </div>
        </div>
        {page.topAndBotButtons && (
          <BotButton pageCode={page.code} sharedProps={sharedProps}></BotButton>
        )}
      </main>
    </>
  );
};

export default App;
