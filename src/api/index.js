export const getVideos = async (location) => {
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${location.latitude},${location.longitude}&locationRadius=10mi&maxResults=${location.maxResults}&q=&type=video&key=AIzaSyC33Rvt71SZQX1ebrodT3VAYpzc7eqW-tA`
  ).then((res) => res.json());
};
