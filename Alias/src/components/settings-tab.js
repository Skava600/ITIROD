export const SettingsTab = () => `
<div id="settings-tab" class="tab settings-container display">
<!--Time Row-->
    <div class="settings-row">
        <div class="settings-col-info">
            <h2>Round Time:</h2>
            <h3>For which you must guess the words</h3>
            <div class="settings-row-buttons">
                <button id="button-time-sub" class="settings-button margin-right">-30 sec.</button>
                <button id="button-time-add" class="settings-button">+30 sec.</button>
            </div>
        </div>
        <div id="settings-col-time" class="settings-col-value">
            <h2 id="minutes-counter">1</h2>
            <h3 id="seconds-counter">:30</h3>
            <h3>min</h3>
        </div>
    </div>
<!--Time Row-->
    <div class="settings-row">
        <div class="settings-col-info">
            <h2>Word Limit:</h2>
            <h3>Necessary for victor</h3>
            <div class="settings-row-buttons">
                <button id="button-words-sub" class="settings-button margin-right">-10 words.</button>
                <button id="button-words-add" class="settings-button">+10 words.</button>
            </div>
        </div>
        <div class="settings-col-value">
            <h2 id="words-counter">30</h2>
        </div>
    </div>
</div>`