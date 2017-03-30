import axios from 'axios';

const login = (user) => {
  return {type: "LOGIN_SUCESSFUL", user}
}

const loginEvent = (username, password) => {
  return (dispatch) =>{
    return axios.post('/api/users/login', {
      username,
      password
    }).then((response) => {
      if(response.status === 200) {
        dispatch(login(response.data));
      } else {
        console.log(response);
      }
    }).catch();

  };
}

export { loginEvent };

export default login;