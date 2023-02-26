import React from "react";
import SignUp from "./Components/Pages/SignUp";
import {Redirect,Route} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import Welcome from "./Components/Pages/Welcome";
import IncompleteProfile from "./Components/Pages/IncompleteProfile";
import {LoginContextProvider} from "./Components/Context/LoginContext";

function App() {
  return (
    <React.Fragment>
      <LoginContextProvider>
       
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
      </LoginContextProvider>
    </React.Fragment>
  );
}
export default App;