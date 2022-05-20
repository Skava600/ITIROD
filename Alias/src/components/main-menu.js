export const MainMenu = () =>`
    <!--Main Side-->
    <div id="main-side" class="side display">
        <!--Teams / Settings / Words-->
        <nav class="top-card-container">
            <ul class="nav-ul">
                <li id="teams-li" class="nav-li">
                    <button id="button-teams" class="nav-button button-color-active">
                        <i class="fas fa-users"></i>
                        <span class="nav-span">Teams</span>
                    </button>
                </li>
                <li id="settings-li" class="nav-li">
                    <button id="button-settings" class="nav-button button-color-passive">
                        <i class="fas fa-cogs"></i>
                        <span  class="nav-span">Settings</span>
                    </button>
                </li>
                <li id="words-li" class="nav-li">
                    <button id="button-words" class="nav-button button-color-passive">
                        <i class="fas fa-book"></i>
                        <span  class="nav-span">Words</span>
                    </button>
                </li>
            </ul>
        </nav>

        <div id="main-tab" class="tab display fill">
        </div>
    </div>`;