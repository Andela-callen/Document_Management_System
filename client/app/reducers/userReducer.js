// import initialState from '../store/initialState';
import {
  LOGIN_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
  GET_USER_SUCCESSFUL,
  GET_USER_REJECTED
} from '../actions/userAction';

const initialState = {
  user: {},
  users: [],
  login_success: false,
  signup_success: false
};

/**
 * @param {*} state
 * @param {*} action
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return Object.assign({}, state, { user: action.user, login_success: true });
  case SIGNUP_SUCCESSFUL:
    return Object.assign({}, state, { user: action.user, signup_success: true });
  case GET_USER_SUCCESSFUL:
    return Object.assign({}, state, { users: action.payload });
  case GET_USER_REJECTED:
    return Object.assign({}, state, { error: action.payload });
  default:
    return state;
  }
}

