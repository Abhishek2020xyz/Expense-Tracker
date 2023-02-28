import React from "react";
import SignUp from "./Components/Pages/SignUp";
import Header from "./Components/Pages/Header";
import {Redirect,Route} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import Welcome from "./Components/Pages/Welcome";
import IncompleteProfile from "./Components/Pages/IncompleteProfile";
import LoginContext,  {LoginContextProvider} from "./Components/Context/LoginContext";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import { useContext } from "react";
import Expenses from "./Components/Expenses/Expenses";
function App() {

  const loginCtx = useContext(LoginContext);
  const isLoggedIn = loginCtx.isLoggedIn
  return (
    <React.Fragment>
      <LoginContextProvider>
       <Header></Header>
        {/* <Route path="*">
          <Redirect to="/signUp" />
        </Route> */}
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/incompleteProfile">
          <IncompleteProfile />
        </Route>
        <Route path="/ForgotPassword">
          <ForgotPassword/>
        </Route>
        {/* <Route path="/expenses">
        {isLoggedIn ? <Expenses/> : <Redirect to="/expenses" />}
        </Route> */}
        <Route path="/expenses">
          <Expenses/>
        </Route>
      </LoginContextProvider>
    </React.Fragment>
  );
}
export default App;