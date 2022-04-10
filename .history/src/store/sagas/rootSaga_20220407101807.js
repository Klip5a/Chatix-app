import { all } from 'redux-saga/effects';

import authSaga from './saga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
