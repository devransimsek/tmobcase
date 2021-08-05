import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MAX_RESULTS } from '../actions/types';
import VideoListItem from './VideoListItem';
import YouTube from 'react-native-youtube';

const VideoList = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.video);
  const [maxResults, setMaxResults] = useState(10);
  const [onEndReachedCalledDuringMomentum, setERCDM] = useState(true);
  const [videoId, setVideoId] = useState('');

  const _openVideoModal = (_videoId) => {
    console.log('_openVideoModal', typeof _videoId);
    setVideoId(_videoId);
  };

  return (
    <>
      {videoId ? (
        <View style={styles.modal}>
          <SafeAreaView />
          <TouchableOpacity
            onPress={() => setVideoId('')}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View>
            <YouTube
              videoId={videoId}
              style={styles.video}
              apiKey={'AIzaSyC33Rvt71SZQX1ebrodT3VAYpzc7eqW-tA'}
              onError={(err) => console.log(err, 'onError')}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <VideoListItem video={item} openVideoModal={_openVideoModal} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Please choose a location from the map. Hold on the marker then
              leave the marker, or double click on the map.
            </Text>
          }
          keyExtractor={(item) => `video-item-${item.id.videoId}`}
          onMomentumScrollBegin={() => setERCDM(false)}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            if (!onEndReachedCalledDuringMomentum) {
              //burada servise tekrar gidilecek.
              setERCDM(true);
              setMaxResults(maxResults + 10);
              dispatch({
                type: SET_MAX_RESULTS,
                payload: maxResults + 10,
              });
            }
          }}
        />
        <SafeAreaView />
      </View>
    </>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  emptyText: {
    margin: 30,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: 21,
  },
  video: { alignSelf: 'stretch', height: 300, margin: 20 },
  modal: {
    flex: 1,
    padding: 20,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    zIndex: 999,
  },
  closeButton: {
    backgroundColor: 'lightgray',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: 20,
  },
  closeButtonText: { color: 'white', fontSize: 30, fontWeight: 'bold' },
});
