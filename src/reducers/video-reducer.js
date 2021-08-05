import { SET_LOCATION, SET_MAX_RESULTS, SET_VIDEOS } from '../actions/types';

const initialState = {
  location: {},
  videos: [],
  maxResults: 10,
};

export default function videoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIDEOS:
      return { ...state, videos: action.payload };

    case SET_LOCATION:
      return { ...state, location: action.payload };

    case SET_MAX_RESULTS:
      return { ...state, maxResults: action.payload };

    default:
      return state;
  }
}
