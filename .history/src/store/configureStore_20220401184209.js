import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

export const configureStore = () => {
  return {
    ...configureStore(rootReducer),
  };
};

export default configureStore
