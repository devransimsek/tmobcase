import { SET_LOCATION, SET_VIDEOS, SET_MAX_RESULTS } from './types';

export const setVideos = (videos) => ({
  type: SET_VIDEOS,
  payload: videos,
});

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});

export const setMaxResults = (maxResults) => ({
  type: SET_MAX_RESULTS,
  payload: maxResults,
});
