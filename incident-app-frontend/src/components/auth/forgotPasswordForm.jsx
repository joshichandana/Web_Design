import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword} from "../../store/actions/useractions";
import { checkEmailExists } from "../../store/actions/useractions";
import styles from './_signup.module.scss'

// const dispatch = useDispatch();
//     // const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         const email = event.target[0].value;
//         const password = event.target[1].value;
//         try {
//             const userJson = dispatch(loginUser(email, password));
//             if (userJson?.error) {
//                 alert(userJson.error);
//             } else {
//                 // Redirect to dashboard or home page after successful login
//             }
//         } catch (err) {
//             console.error('Error while logging in:', err);
//             alert('Error while logging in');
//         }
//     }

 const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
        const userJson = dispatch(forgotPassword(email, password));
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
 
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

//   // handle form submission and password reset
//   const handlePasswordReset = async (event) => {
//     event.preventDefault();
//     // Call API endpoint to reset password
//     const response = await fetch("http://localhost:8080/users/forgotPassword", {
//       method: "PUT",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (response.ok) {
//       // Password reset successful, show success message
//       alert("Password reset successful!");
//     } else {
//       // Password reset failed, show error message
//       alert("Password reset failed.");
//     }
//   }

// return (
//   <form onSubmit={handlePasswordReset}>
//     <div>
//       <label htmlFor="email">Email:</label>
//       <input
//         id="email"
//         type="email"
//         placeholder="Enter your email"
//         required
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//     </div>
//     <div>
//       <label htmlFor="password">New Password:</label>
//       <input
//         id="password"
//         type="password"
//         placeholder="Enter your new password"
//         required
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//     </div>
//     <div>
//       <button type="submit">Reset Password</button>
//     </div>
//   </form>
// );
// }

return (
    <div className={styles.forgotPasswordParent}>
        <div className={styles.signUpContainer}>
            {/* <img height="500px" alt="Login Logo" src={loginAnimation}/> */}
            <div  className={styles.mainContainer}>
                <div className={styles.formContainer}>
                    <h1 className={styles.h1Container}>Forgot Password</h1>
                    <p>Not a user? <b><a href='/signup' className={styles.anchorLogin}>SignUp</a></b></p>
                    <form onSubmit={handleLogin} className="loginform">
                        
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input id="email" type='email' placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label htmlFor="password">New Password:</label>
                            <input id="password" type="password" placeholder="Enter new password" required />
                        </div>
                        <div>
                            <button type="submit">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>     
  
  
  
);
 }
export default ForgotPasswordForm;