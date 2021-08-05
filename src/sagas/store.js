import { createStore, applyMiddleware, combineReducers } from 'redux';
import videoReducer from '../reducers/video-reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './index';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  video: videoReducer,
});
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
