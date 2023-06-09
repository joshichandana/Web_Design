// 
/**
 * Login component.
 * 
 *
 * @module components/auth
 * @requires react
 * @requires react-redux
 * @requires @mui/material
 * @requires next
 * @requires next/router
 * @requires next/Image
 * @requires store/slice/appSlice
 */

// import styles from "./_signup.module.scss";
import styles from "./_signupform.module.scss"
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import Loginform from "./Loginform.jsx";
import { setCurrentView } from "../../store/slice/appSlice";
import Image from "next/image";
import loginAnimation from '../../assets/login.gif'
const Login = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCurrentView("Login"));
    }, [])

    const getHeight = () => {
        return window.innerHeight*(2/3);
    }

    return (
        <div className={styles.signInParent}>
            
            <div className={styles.signUpContainer}>
                <Image  height="500px" alt="Login Logo" src={loginAnimation}/>
                <div  className={styles.mainContainer}>
                    <div className={styles.formContainer}>
                        <h1 className={styles.h1Container}>Login</h1>
                        <p>Not a user? <b><a href='/signup' className={styles.anchorLogin}>SignUp</a></b></p>
                        <Loginform/> 
                    </div>
                </div>
                
                {/* <div  className={styles.mainContainer}>
                    <div className={styles.formContainer}>
                        <h1 className={styles.h1Container}>Login for support portal</h1>
                        <p>Not a user? <b><a href='/signup' className={styles.anchorLogin}>SignUp</a></b></p>
                        <Loginform/> 
                    </div>
                </div> */}
            </div>
        </div>
        
    );
}

export default Login;