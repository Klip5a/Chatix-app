import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const configureStore = () => {
  return {
    ...configureStore(rootReducer),
  };
};

export default configureStore
