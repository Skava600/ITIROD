export const DEFAULT_USER_DATA = {
  id: "",
  name: "",
  hasSavedGame: false,
  isSignedIn: false,
};

export const DEFAULT_GAME_DATA = {
  teams: [
    { name: "teamA", score: 0 },
    { name: "teamB", score: 0 },
  ],
  teamNum: 0,
  timeLimit: 5,
  wordLimit: 30,
  wordNum: 0,
  wordsIndex: 0,
  maxPoints: 0,
};

export const getDefaultGameData = () =>
  JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));
