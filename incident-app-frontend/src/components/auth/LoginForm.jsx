import React from "react";
import { useDispatch } from "react-redux";
import { loginUser} from "../../store/actions/useractions";
import { Link } from "react-router-dom";
// import styles from "./_signupform.module.scss"
import styles from './_signup.module.scss'
//import SignupForm from "./SignupForm";

const LoginForm = () => {
    const dispatch = useDispatch();
    // const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        try {
            const userJson = dispatch(loginUser(email, password));
            if (userJson?.error) {
                alert(userJson.error);
            } else {
                // Redirect to dashboard or home page after successful login
            }
        } catch (err) {
            console.error('Error while logging in:', err);
            alert('Error while logging in');
        }
    }

    return (

        <form className={styles.formHandleSignUp} onSubmit={handleLogin}>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>
                    Email<span className={styles.formAsterisk}>*</span>
                </label>
                <input type='email' className={styles.formControl} placeholder='Your Email'  required />
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>
                    Password<span className={styles.formAsterisk}>*</span>
                </label>
                <input type='password' className={styles.formControl} placeholder='Your Password'  required />
            </div>
            <div className={[styles.formItem,styles.forgotPassword].join(' ')}>
                <p><a href='/forgotPassword'>Forgot password?</a></p>
            </div>
            <div className={styles.formItem}>
                <button type='submit' className={styles.loginButton} variant="contained">Login</button>
            </div>
        </form>

    );
}

export default LoginForm;