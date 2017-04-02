const loggedIn = (nextState, replace, callback) => {
  const token = window.localStorage.getItem('token');
  if(!token) {
    replace('/login');
    return callback();
  } else {
    return callback();
  }
}

export default loggedIn;