import { fork } from 'redux-saga/effects';
import { loadVideoWatcher } from './videosSaga';

export function* rootSaga() {
  yield fork(loadVideoWatcher);
}
