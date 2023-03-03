import { useContext, useRef } from "react";
import Form from "../Layout/Form";
import ExpenseContext from "../Context/ExpenseContext";
import classes from "./EditForm.module.css";
import React from "react";
import ReactDOM from "react-dom";


const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
  };
  
  const EditForm = (props) => {
    const id = document.getElementById("EditModalOverlay");
    const expenseCtx = useContext(ExpenseContext);
  
    const moneyRef = useRef("");
    const descRef = useRef("");
    const categoryRef = useRef("");
  
    const expense = props.editExpense;
  
    const editExpenseHandler = (event) => {
      event.preventDefault();
  
      const expenseItem = {
        id: expense.id,
        money: moneyRef.current.value,
        description: descRef.current.value,
        category: categoryRef.current.value,
      };
      expenseCtx.editExpense(expenseItem);
      props.onClose();
    };
  
    const Overlay = () => {
      return (
        <div className={classes.modal}>
          <Form onSubmit={editExpenseHandler}>
            <h2>Edit Expense</h2>
            <div>
              <label htmlFor="moneyId">Money Spent</label>
              <input
                id="moneyId"
                type="number"
                ref={moneyRef}
                defaultValue={expense.money}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="descId">Description</label>
              <input
                id="descId"
                type="text"
                ref={descRef}
                defaultValue={expense.description}
                required
              ></input>
            </div>
            <div htmlFor="categoryId">
              <label htmlFor="categoryId">Category</label>
              <select
                id="categoryId"
                ref={categoryRef}
                defaultValue={expense.category}
              >
                <option value="Food">Food</option>
                <option value="Grocery">Grocery</option>
                <option value="Fuel">Fuel</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button>Edit Expense</button>
          </Form>
        </div>
      );
    };
  
    return (
      <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, id)}
        {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, id)}
      </React.Fragment>
    );
  };
  
  export default EditForm;