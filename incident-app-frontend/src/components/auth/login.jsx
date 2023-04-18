// Login.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import loginAnimation from '../resources/login.gif';
import styles from './_signup.module.scss'

const Login = () => {
  const history = useNavigate();

  const handleSuccessfulLogin = () => {
    history('/');
  };

  return (
    <div className={styles.signInParent}>
        <div className={styles.signUpContainer}>
          <img height="500px" alt="Login Logo" src={loginAnimation}/>
          <div  className={styles.mainContainer}>
              <div className={styles.formContainer}>
                  <h1 className={styles.h1Container}>Login for support portal</h1>
                  <p>Not a user? <b><a href='/signup' className={styles.anchorLogin}>SignUp</a></b></p>
                  <LoginForm/> 
              </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
