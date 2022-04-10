import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));

const configureStore = createStore(rootReducer, composedEnhancer);

sagaMiddleware.run(rootSaga);

export default configureStore;
