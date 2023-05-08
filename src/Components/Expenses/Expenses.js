import React, {useRef,  useEffect} from "react";

import Form from "../Layout/Form";

import { useSelector } from "react-redux";

import { ExpenseActions } from "../Store/ExpenseReducer";
import "./Expenses.css";

const Expenses = (props) =>{
  const expenses = useSelector((state) => state.expense.expenses);
   

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
    categoryRef.current.value = "";

    console.log(expense)
  };

  

  
  const addExpenseFetching = async (expense) => {
    try {
      const response = await fetch(
        `https://postvalue-77b81-default-rtdb.firebaseio.com/expense/${localStorage.getItem('email')}.json`,
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

        const deleteExpenseHandler = (id) => {
          fetch(
            `https://postvalue-77b81-default-rtdb.firebaseio.com/expense/${localStorage.getItem('email')}/${id}.json`,
            {
              method: "DELETE",
            }
          )
            .then((response) => response.json())
            .then((data) => {
               console.log(data);
              // getExpenseData();
              props.getExpenseFetching();
              
              console.log("Expense successfuly deleted");
            })
            .catch((error) => {
              console.log(error);
            });
        };
const editExpenseHandler = (expenseItem) => {
 
  moneyRef.current.value= expenseItem.money;
  descRef.current.value = expenseItem.description;
  categoryRef.current.value = expenseItem.category;

  deleteExpenseHandler(expenseItem.id);
  };


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
          
      <div>
      <ul>
        {expenses.map((expenseItem,id) => (
          <li key={id}>
            {expenseItem.money} {expenseItem.description} {expenseItem.category}

           
          <button onClick={()=>editExpenseHandler(expenseItem)}>Edit</button>
            <button onClick={()=>deleteExpenseHandler(expenseItem.id)}>
              Delete
            </button>
        </li>
      ))}
    </ul>
      </div>
        </div>
    )
}
export default Expenses;



