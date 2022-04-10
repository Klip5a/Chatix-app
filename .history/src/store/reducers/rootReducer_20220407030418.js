import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import alertReducer from './alert.reducer';

const rootReducer = combineReducers({
  userReducer
  alertReducer,
});

export default rootReducer;
