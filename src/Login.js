import React from "react";
import { Button } from "@mui/material";
import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = async () => {
    // Signs-in Friendly Chat.
    // Sign in Firebase using popup auth and Google as the identity provider.
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="Login">
      <div className="login-container">
        {/* img */}
        <img
          src="https://i.pinimg.com/originals/2d/fa/57/2dfa5745e33478f581e238b8f59c35d8.jpg"
          //   height="300px"
          //   width="300x"
          alt="MK-AllChat"
        />
        <div className="login-text">
          <h3 style={{ letterSpacing: "2px" }}>Sign in to MK-AllChat</h3>
        </div>
        {/* <Button onClick={signIn}>Sign in With Google</Button> */}
        <Button onClick={signIn}>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Login;
