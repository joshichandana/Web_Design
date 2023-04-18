import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signUpAnimation from '../resources/signup.jpg'
import styles from './_signup.module.scss'
import SignupForm from './SignupForm';

const Signup = () => {
  const history = useNavigate();

  const handleSuccessfulSignup = () => {
    history('/');
  };

  return (
    <div className={styles.signUpParent}>
      <div className={styles.signUpContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.formContainer}>
            <h1 className={styles.h1Container}>Sign up for support portal</h1>
            <p>Already a user? <b><a href='/login' className={styles.anchorLogin}>Login</a></b></p>
            <SignupForm/>
          </div>
        </div>
        <img alt="SignUp Logo" src={signUpAnimation} width="550" height="457"/>
      </div>
    </div>
  );
};

export default Signup;