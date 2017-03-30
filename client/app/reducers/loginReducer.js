import initialState from '../store/initialState';


const loginReducer = (state=initialState.user, action) => {
  switch(action.type){
    case "LOGIN_SUCCESSFUL":
      return [...state, object.assign({}, action.user)];
    default:
      return state;
  }  
};

export default loginReducer;