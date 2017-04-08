import axios from 'axios';
// import jwt from 'jsonwebtoken';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';

export const GET_USER_SUCCESSFUL = 'GET_ROLE_SUCCESSFUL';
export const GET_USER_REJECTED = 'GET_ROLE_SUCCESSFUL';

export const GET_A_USER_SUCCESSFUL = 'GET_ROLE_SUCCESSFUL';
export const GET_A_USER_REJECTED = 'GET_ROLE_SUCCESSFUL';

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESSFUL, user
  };
};
export const signupSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESSFUL, user
  };
};
export const getUserSuccessful = (users) => {
  return {
    type: GET_USER_SUCCESSFUL, payload: users
  };
};
export const getUserRejected = (users) => {
  return {
    type: GET_USER_REJECTED, payload: users
  };
};

export const getAuserSuccessful = (user) => {
  return {
    type: GET_A_USER_SUCCESSFUL, payload: user
  };
};
export const getAuserRejected = (user) => {
  return {
    type: GET_A_USER_REJECTED, payload: user
  };
};

const loginEvent = (username, password) => {
  return (dispatch) => {
    return axios.post('/api/users/login', {
      username,
      password
    }).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userid', data.user.userId);
        // localStorage.setItem('roleId', data.user.roleId);
        // dispatch(loginSuccess(response.data));
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

const getUsers = () => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('token'),
    }
  };
  return (dispatch) => {
    return axios.get('/api/users/', config)
    .then((response) => {
      dispatch(getUserSuccessful(response.data.users));
    })
    .catch((err) => {
      dispatch(getUserRejected(err.data));
    });
  };
};

const getOneUser = () => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('token'),
    }
  };
  const userId = window.localStorage.getItem('userid');
  return (dispatch) => {
    return axios.get(`/api/users/${userId}`, config)
    .then((response) => {
      response.data.user = response.data.msg;
      dispatch(loginSuccess(response.data));
    })
    .catch((err) => {
      dispatch(getAuserRejected(err.data));
    });
  };
};

export { signupEvent, loginEvent, getUsers, getOneUser };
