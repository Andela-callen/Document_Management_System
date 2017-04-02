import axios from 'axios';
// import jwt from 'jsonwebtoken';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';

const loginSuccess = (user) => {
  return { type: LOGIN_SUCCESSFUL, user };
}
const signupSuccess = (user) => {
  return { type: SIGNUP_SUCCESSFUL, user };
}
const loginEvent = (username, password) => {
  return (dispatch) => {
    return axios.post('/api/users/login', {
      username,
      password
    }).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        dispatch(loginSuccess(response.data));
      }
      //  else {
      //   console.log(response);
      // }
    }).catch((err) => {
      throw new Error(err);
    });
  };
};

const signupEvent = (firstname, lastname, username, email, password, password_confirmation) => {
  return (dispatch) => {
    return axios.post('/api/users/', {
      firstname,
      lastname,
      username,
      email,
      password,
      password_confirmation
    }).then((response) => {
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        dispatch(signupSuccess(response.data));
      }
    }).catch((err) => {
      throw new Error(err);
    });
  };
};


export { signupEvent };

export { loginEvent };

export { signupSuccess };

export default loginSuccess;
