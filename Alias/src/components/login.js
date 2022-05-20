export const Login = () => `
<div id="login-side" class="side display">
    <div id="modal">
        <h2 class="login-h2">Please, login to your account</h2>
        <div class="underline"></div>
        <div class="inputs">
            <input type="email" placeholder="email" id="email">
            <input type="password" placeholder="password" id="password" minlength="6">
        </div>
        <div class="controls">
            <button id="sign-up">
                <span>Sign Up</span>
            </button>
            <button id="sign-in">
                <span>Sign in</span>
            </button>
        </div>
        <a id="sign-in-with-google">Sign in via  google</a>
    </div>
</div>`;