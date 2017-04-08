import {
  GET_ROLE_SUCCESSFUL,
  GET_ROLE_REJECTED
} from '../actions/roleAction';

const initialState = {
  roles: [],
  error: null,
};

/**
 * @param {*} state 
 * @param {*} action 
 */
export default function roleReducer(state = initialState, action) {
  switch (action.type) {
  case GET_ROLE_SUCCESSFUL:
    return Object.assign({}, state, { roles: action.payload });
  case GET_ROLE_REJECTED:
    return Object.assign({}, state, { error: action.payload });
  default:
    return state;
  }
}
