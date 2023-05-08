 import React from "react";
import SignUp from "./Components/Pages/SignUp";
import Header from "./Components/Pages/Header";
import {Redirect , Route} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import Welcome from "./Components/Pages/Welcome";
import IncompleteProfile from "./Components/Pages/IncompleteProfile";
// import LoginContext from "./Components/Context/LoginContext";
import ForgotPassword from "./Components/Pages/ForgotPassword";
// import { useContext } from "react";
import Expenses from "./Components/Expenses/Expenses";

// import { ExpenseContextProvider } from "./Components/Context/ExpenseContext";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "./Components/Store/ExpenseReducer";


function App() {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const dispatch = useDispatch();       

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();       

  const getExpenseFetching = async () => {
    try {
      const response = await fetch(
        `https://postvalue-77b81-default-rtdb.firebaseio.com/expense/${localStorage.getItem('email')}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      let itemsArray = [];
      let expensesAmount;
      if (!!data) {
        itemsArray = Object.keys(data).map((expense) => {
          return {
            id: expense,
            money: data[expense].money,
            description: data[expense].description,
            category: data[expense].category,
          };
        });
      }
      expensesAmount = itemsArray.reduce((curNumber, expense) => {
        return curNumber + Number(expense.money);
      }, 0);
      dispatch(
        ExpenseActions.addExpense({
          itemsArray: itemsArray,
          expensesAmount: expensesAmount,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
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

      {/* <Route path="/welcome">
        {isLoggedIn ? (
          <Welcome  />
        ) : (
          <Redirect to="/signIn" />
        )}
      </Route> */}

      <Route path="/incompleteProfile">
        <IncompleteProfile />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
     
      <Route path="/expenses">
       
       <Expenses getExpenseFetching={getExpenseFetching} />
      
      </Route>
    </React.Fragment>
  ); 
}
export default App;