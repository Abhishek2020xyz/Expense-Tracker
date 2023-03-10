import React from "react";
import { Link } from "react-router-dom";
//import LoginContext from "../Context/LoginContext";
import { useSelector } from "react-redux";
import Expenses from "../Expenses/Expenses";

const Welcome = () => {
 
  //const loginCtx = useContext(LoginContext);
  const idToken = useSelector((state) => state.auth.idToken);

  const verifyEmailHandler = async () =>{
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCcDNxwm_rDXN068U1-nrHh3QKnnEGtZbY",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        requestType: "VERIFY_EMAIL",
      }),
      headers: {
     "Content-Type":"application/json",
      },
    }
  );
  const data = await response.json();
  if(response.ok){
    console.log(data.email)
  }else{
    alert(data.error.message);
  }
}

  return (
   
    <div>
      {/* <h2>Welcome To Expense Tracker</h2> */}
      
      <p>
        Your Profile is incomplete.
        <Link to="/incompleteProfile"> Complete Profile</Link>
        {/* <Link to="/expenses">Expenses</Link> */}
      </p>
      <button  style={{float:'right',marginBottom:'500px'}} onClick={verifyEmailHandler}>Verify Email</button>
      
    
    
    </div>
  );
};

export default Welcome;