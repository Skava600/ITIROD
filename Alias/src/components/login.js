import { useState, useEffect } from "react";
import {
  signInWithEmail,
  signUpWithEmail,
  redirectGoogleSignUp,
} from "../server";

export const Login = ({userData, gameData, nextPage,prevPage, setEmail, setPassword, email, password}) => {

  return (
    <div id="main-card" className="main-card">
      <div id="login-side" className="side display">
        <div id="modal">
          <h2 className="login-h2">Please, login to your account</h2>
          <div className="underline"></div>
          <div className="inputs">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              minLength="6"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="controls">
            <button
              id="sign-up"
              onClick={() => signUpWithEmail(email, password)}
            >
              <span>Sign Up</span>
            </button>
            <button
              id="sign-in"
              onClick={() => signInWithEmail(email, password)}
            >
              <span>Sign In</span>
            </button>
          </div>
          <a id="sign-in-with-google" onClick={redirectGoogleSignUp}>
            Sign in via Google
          </a>
        </div>
      </div>
    </div>
  );
};
