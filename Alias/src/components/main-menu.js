import { pages } from "../consts/pages";

export const MainMenu = ({ setPage }) => (
  <>
    <nav className="top-card-container">
      <ul className="nav-ul">
        <li id="teams-li" className="nav-li">
          <button
            id="button-teams"
            className="nav-button button-color-active"
            onClick={() => setPage(pages.TeamsTab.code)}
          >
            <i className="fas fa-users"></i>
            <span className="nav-span">Teams</span>
          </button>
        </li>
        <li id="settings-li" className="nav-li">
          <button
            id="button-settings"
            className="nav-button button-color-passive"
            onClick={() => setPage(pages.SettingsTab.code)}
          >
            <i className="fas fa-cogs"></i>
            <span className="nav-span">Settings</span>
          </button>
        </li>
        <li id="words-li" className="nav-li">
          <button
            id="button-words"
            className="nav-button button-color-passive"
            onClick={() => setPage(pages.WordsTab.code)}
          >
            <i className="fas fa-book"></i>
            <span className="nav-span">Words</span>
          </button>
        </li>
      </ul>
    </nav>
  </>
);
