export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const LOGIN_USER = "LOGIN_USER";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";


export const addUserDetails = (firstname, lastname, number, email, password, role,securityQuestion, securityAnswer ) => {

  return async (dispatch) => {
    dispatch({ type: ADD_USER_DETAILS});

    const userData = 
    {
      firstname: firstname,
      lastname: lastname,
      phoneNumber: number,
      email:email,
      password:password,
      role: role,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer
    };
    console.log(JSON.stringify(userData));

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: 'POST',
        mode : 'cors',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Error while signing up');
      }

      const userJson = await response.json();

      if (userJson.error) {
        alert(userJson.error);
      } else {
        window.location.href = '/login';
      }
    } catch (error) {

      console.error(error);

    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
  dispatch({ type: LOGIN_USER });
  const loginData = {
    email: email,
    password: password
  };
  try {
    const response = await fetch("http://localhost:8080/users/auth", {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    console.log("hello", loginData)
    if (!response.ok) {
      throw new Error('Error while logging in');
    }
    const userJson = await response.json();

    if (userJson.error) {
      alert(userJson.error);
    } else {
      //dispatch({ type: LOGIN_USER, payload: userJson });
      window.location.href = '/dashboard';
    }
  
  } catch (error) {
    console.error(error);
  }
  }
}

export const forgotPassword = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const updatePasswordData = {
      email: email,
      password: password
    };
  // return async (dispatch) => {
  //   dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });

    try {
        const response = await fetch('http://localhost:8080/users/forgotpassword', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePasswordData)
      });

      if (!response.ok) {
        throw new Error('Error while resetting password');
      }

      const result = await response.json();

      if (result.error) {
        alert(result.error);
      } else {
        //dispatch({ type: LOGIN_USER, payload: userJson });
        window.location.href = '/login';
      }
      //dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: result.message });

    } catch (error) {
      console.error(error);
      //dispatch({ type: 'FORGOT_PASSWORD_FAILURE', payload: error.message });
    }
  };
};

export const checkEmailExists = (email) => {
  return async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/email-exists?email=${email}`);

      if (!response.ok) {
        throw new Error('Error while checking if email exists');
      }

      const result = await response.json();

      return result.exists;

    } catch (error) {
      console.error(error);
      return false;
    }
  };
};

