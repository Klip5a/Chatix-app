import { combineReducers } from 'redux';

import authenticated from './reducer';

const rootReducer = combineReducers({
  authenticated
});

export default rootReducer;
