import React, {useRef, useContext, useEffect,useState} from "react";
//import ExpenseContext from "../Context/ExpenseContext";
import Form from "../Layout/Form";
import EditForm from "./EditForm";
import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
//import { ExpenseActions } from "../Store/ExpenseReducer";
import "./Expenses.css";

const Expenses = (props) =>{
    //const expenseCtx = useContext(ExpenseContext);
    const [editFormState, setEditFormState] = useState(false);
    const [editExpense, setEditExpense] = useState("");

    const theme = useSelector((state) => state.theme.theme);
    const moneyRef = useRef("");
    const descRef = useRef("");
    const categoryRef = useRef("");
    
    const addExpenseHandler = (event) =>{
        event.preventDefault();
        const expense = {
            money: moneyRef.current.value,
            description: descRef.current.value,
            category: categoryRef.current.value,
          };
      
          addExpenseFetching(expense);
       moneyRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "Food";
  };

  const editExpenseHandler = (id, money, description, category) => {
    setEditFormState(true);
    const expense = {
      id: id,
      money: money,
      description: description,
      category: category,
    };
    setEditExpense(expense);
  };

  const onCloseStateHandler = () => {
    setEditFormState(false);
  };
  const addExpenseFetching = async (expense) => {
    try {
      const response = await fetch(
        "https://postvalue-77b81-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify({
            money: expense.money,
            description: expense.description,
            category: expense.category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Expenses", data);
      props.getExpenseFetching();
    } catch (error) {
      alert(error.message);
    }
  };

        useEffect(() => {
          props.getExpenseFetching();
        }, []);

    return(
      <div className={`${theme}`}>
            <h2>Expenses Page...</h2>
            <Form onSubmit={addExpenseHandler}>
            <h2>Add Expense</h2>
             <div>
                <label htmlFor="moneyId">Money Spent</label>
                <input id="moneyId" type="number" ref={moneyRef} required></input>
             </div>
             <div>
             <label htmlFor="descId">Description</label>
            <input id="descId" type="text" ref={descRef} required></input>  
             </div>
             <div htmlFor="categoryId">
             <label htmlFor="categoryId">Category</label>
            <select id="categoryId" ref={categoryRef}>
                <option value="Food">Food</option>
                <option value="Grocery">Grocery</option>
                <option value="Petrol">Petrol</option>
                <option value="Other">Other</option>
            </select>
             </div>
             <button>Add Expense</button>
            </Form>
            <ExpenseItem
            editExpense={editExpenseHandler}
           getExpenseFetching={props.getExpenseFetching}
           />
            
      {editFormState && (
        <EditForm
        onClose={onCloseStateHandler}
        editExpense={editExpense}
        getExpenseFetching={props.getExpenseFetching}
      />
      )}
        </div>
    )
}
export default Expenses;
