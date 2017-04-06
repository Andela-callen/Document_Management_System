import axios from 'axios';

export const GET_ROLE_SUCCESSFUL = 'GET_ROLE_SUCCESSFUL';
export const GET_ROLE_REJECTED = 'GET_ROLE_SUCCESSFUL';

export const getRoleSuccessful = (roles) => {
  return {
    type: GET_ROLE_SUCCESSFUL, payload: roles
  }
}

export const getRoleRejected = (roles) =>{
  return {
    type: GET_ROLE_REJECTED, payload: roles
  }
}

const getRoles = () => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('token'),
    }
  };
  return (dispatch) => {
    return axios.get('/api/roles/', config).then((response) => {
      dispatch(getRoleSuccessful(response.data));
    })
    .catch((err) => {
      dispatch(getRoleRejected(err.data));
    })
  }
} 

export {
  getRoles
}


