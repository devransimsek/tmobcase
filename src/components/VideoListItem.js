import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const VideoListItem = ({ video, openVideoModal }) => {
  const date = new Date(video.snippet.publishedAt).toDateString();
  return (
    <TouchableOpacity
      style={styles.itemCont}
      onPress={() => openVideoModal(video.id.videoId)}
    >
      <Image
        source={{ uri: video.snippet.thumbnails.medium.url }}
        style={{ height: 300 }}
      />
      <Text style={styles.title}>{video.snippet.title}</Text>
      <Text style={styles.publisher}>{video.snippet.channelTitle}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

export default VideoListItem;

const styles = StyleSheet.create({
  itemCont: {
    padding: 18,
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  publisher: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
  },
});
