import {
  Login,
  RulesTab,
  SettingsTab,
  GameTab,
  TeamsTab,
  LeaderboardTab,
  WordsTab,
  EndTab,
} from "../components";

export const pages = {
  Login: {
    code: "Login",
    topAndBotButtons: false,
    prevPageCode: "TeamsTab",
    nextPageCode: "LeaderboardTab",

    component: Login,
  },
  TeamsTab: {
    code: "TeamsTab",
    topAndBotButtons: true,
    prevPageCode: "RulesTab",
    nextPageCode: "LeaderboardTab",

    component: TeamsTab,
  },
  SettingsTab: {
    code: "SettingsTab",
    topAndBotButtons: false,
    prevPageCode: "TeamsTab",
    nextPageCode: "WordsTab",

    component: SettingsTab,
  },
  WordsTab: {
    code: "WordsTab",
    topAndBotButtons: false,
    prevPageCode: "SettingsTab",
    nextPageCode: "TeamsTab",

    component: WordsTab,
  },
  RulesTab: {
    code: "RulesTab",
    topAndBotButtons: false,
    prevPageCode: "TeamsTab",
    nextPageCode: "TeamsTab",

    component: RulesTab,
  },
  LeaderboardTab: {
    code: "LeaderboardTab",
    topAndBotButtons: false,
    prevPageCode: "TeamsTab",
    nextPageCode: "GameTab",

    component: LeaderboardTab,
  },
  GameTab: {
    code: "GameTab",
    topAndBotButtons: true,
    prevPageCode: "LeaderboardTab",
    nextPageCode: "EndTab",

    component: GameTab,
  },
  EndTab: {
    code: "EndTab",
    topAndBotButtons: false,
    prevPageCode: "TeamsTab",
    nextPageCode: "LeaderboardTab",

    component: EndTab,
  },
};
