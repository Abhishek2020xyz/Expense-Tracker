import React from "react";
import { useRef } from "react";
import { Link , useHistory} from "react-router-dom";
//import LoginContext from "../Context/LoginContext";
import Form from "../Layout/Form";
import { useDispatch } from "react-redux";
import {AuthActions} from "../Store/AuthReducer";

const SignIn = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");

  const history = useHistory("");
  const dispatch = useDispatch();

  //const loginCtx = useContext(LoginContext);

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcDNxwm_rDXN068U1-nrHh3QKnnEGtZbY",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: pswdValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      const replacedEmailId =emailValue.replace("@", "").replace(".", "");
      localStorage.setItem('email',replacedEmailId)
      console.log(data.email);

      emailRef.current.value = "";
      pswdRef.current.value = "";

      //loginCtx.login(data.email, data.idToken);
      dispatch(AuthActions.login({ email: data.email, idToken: data.idToken }));

      history.replace("/welcome");
    } else {
      alert(data.error.message);
    }
  };
  return (
    <Form onSubmit={signInSubmitHandler} >
    <div>
      <h3>Sign In</h3>
    </div>
    <div>
      <input
        id="emailId"
        placeholder="Email"
        type="text"
        ref={emailRef}
      ></input>
      <input
        id="passwordId"
        placeholder="Password"
        type="password"
        ref={pswdRef}
      />
    </div>
    <button>Sign In</button>
    <Link to="/forgotPassword">Forgot Password?</Link>
  </Form>
);
};
export default SignIn;