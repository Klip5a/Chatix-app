import { combineReducers } from 'redux';

import auth from './reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
