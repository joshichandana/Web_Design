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
    <div className={styles.signUpContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.formContainer}>
                    <h1 className={styles.h1Container}>Sign up for support portal</h1>
                    <p>Already a user? <b><a href='/login' className={styles.anchorLogin}>Login</a></b></p>
                    <SignupForm/>
                </div>
            </div>
            <img alt="SignUp Logo" src={signUpAnimation} width={window.innerWidth*(3/5)} height={window.innerHeight*(3/4)}/>
        </div>

  );
};

export default Signup;