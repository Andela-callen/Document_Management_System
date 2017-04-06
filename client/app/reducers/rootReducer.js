import { combineReducers } from 'redux';
import userReducer from './userReducer';
import documentReducer from'./documentReducer';
import roleReducer from './roleReducer'

const rootReducer = combineReducers({
  userReducer,
  documentReducer,
  roleReducer
});
export default rootReducer;
