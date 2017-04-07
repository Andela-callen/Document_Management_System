import {GET_ROLE_SUCCESSFUL} from '../actions/roleAction';
import {GET_ROLE_REJECTED} from '../actions/roleAction';

const initialState = {
  roles: [],
  pagination: null,
  error: null,
};

export default function roleReducer(state = initialState, action) {
  switch (action.type){
    case GET_ROLE_SUCCESSFUL:
      return Object.assign({}, state, { roles: action.payload.result, pagination: action.payload.pagination });
    case GET_ROLE_REJECTED:
      return Object.assign({}, state, { error: action.payload});
    default:
      return state;
  }
}
