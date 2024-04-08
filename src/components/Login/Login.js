import React, {  useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{
  if(action.type==='UserInput'){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return{value:state.value,isValid:state.value.includes('@')}
  }
    return {value:'',isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege,setEnteredCollege]=useState('')
  const [collegeIsValid,setCollegeIsValid]=useState()

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]= useReducer(emailReducer,{value:'',isValid:false})

  // useEffect(()=>{
  //   const identifier= setTimeout (() => {
  //     console.log('checking form validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>1
  //       )
  //   }, 5000);
  //   return ()=>{
  //     console.log('cleanUp')
  //     clearInterval(identifier)
  //   }
    
  // },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    
    dispatchEmail({type:'UserInput',val:event.target.value}) 
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
       emailState.isValid&& event.target.value.trim().length>6
    )
  };
  const collegeChangeHandeler = (event) => {
    setEnteredCollege(event.target.value);
  };

  
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegelHandler=()=>{
    setCollegeIsValid(enteredCollege.trim().length>1);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={`${classes.control} ${collegeIsValid === false ? classes.invalid : ''}`}>

          <label htmlFor="college">College</label>
          <input type="text"
          id="college"
          value={enteredCollege}
          onChange={collegeChangeHandeler}
          onBlur={validateCollegelHandler}
          />
          


        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
      
    

  

