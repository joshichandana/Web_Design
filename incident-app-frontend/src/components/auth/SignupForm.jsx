import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../store/actions/useractions";
import { Link } from "react-router-dom";
import styles from './_signup.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SignupForm() {
  const dispatch = useDispatch();
  const fields = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      name: "firstname",
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      name: "lastname",
    },
    {
      label: "Contact",
      type: "text",
      placeholder: "Enter Mobile",
      name: "phoneNumber",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
      name: "email",
    },
    
    {
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      name: "password",
    }
    
  ]
  const handleSignUp = (event) => {
    event.preventDefault();
    const data = {};
    fields.forEach((field) => {
      data[field.name] = event.target[field.name].value;
    });
    data.role = event.target.role.value;
    //data.securityQuestion = securityQuestion;
    //data.securityAnswer = securityAnswer;
    console.log(data);
    dispatch(addUserDetails(
      data.firstname,
      data.lastname,
      data.phoneNumber,
      data.email,
      data.password,
      data.role,
      //data.securityQuestion,
      //data.securityAnswer
    ));
  };

  return (
    <form onSubmit={handleSignUp} className={styles.formHandleSignUp}>
      <Container>
        <Row>
          {fields.map((field) => {
            return (
              <Col md={field.name != "password" ? 6 : 12} className="customPadding">
                <div key={field.name} className={styles.formItem}>
                  <label className={styles.formLabel}>
                    {field.label}<span className={styles.formAsterisk}>*</span>
                  </label>
                  <input type={field.type} name={field.name} placeholder={field.placeholder} className={styles.formControl}/>
                </div>
              </Col>
            );
          })}
          <Col md={12} className="customPadding">
          <div className={styles.formItem}>
                    <label className={styles.formLabel}>Role<span className={styles.formAsterisk}>*</span></label>
                    <div className={styles.labelHolder}>
                      <div className={styles.container}>
                        <select name="role" required>
                                <option value="supportTeam">Agent</option>
                                <option value="customer">Customer</option>
                        </select>
                      </div>
                    </div>  
          </div>
          
        
      <div className={styles.formItem}>
        <button type="submit" variant="contained" className={styles.registerButton} >
          Register
        </button>
      </div>
      </Col>
      </Row>
      </Container>
    </form>
  );

}

export default SignupForm;
