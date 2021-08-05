import { call, put, takeEvery, select } from 'redux-saga/effects';
import { setVideos } from '../actions/video-actions';
import { getVideos } from '../api';
import { SET_LOCATION, SET_MAX_RESULTS } from '../actions/types';

export function* loadVideoWatcher() {
  yield takeEvery(SET_LOCATION, fetchVideos);
  yield takeEvery(SET_MAX_RESULTS, fetchMoreVideos);
}

function* fetchVideos(action) {
  const response = yield call(getVideos, { ...action.payload, maxResults: 10 });
  if (response.error) {
    yield put(setVideos([]));
  } else {
    yield put(setVideos(response.items));
  }
}

function* fetchMoreVideos(action) {
  const state = yield select();
  const location = state.video.location;
  const response = yield call(getVideos, {
    ...location,
    maxResults: action.payload,
  });
  console.log(response, '======');
  if (response.error) {
    yield put(setVideos([]));
  } else {
    yield put(setVideos(response.items));
  }
}
