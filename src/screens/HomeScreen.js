import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { SET_LOCATION } from '../actions/types';
import VideoList from '../components/VideoList';
import {
  checkPermissions,
  requestLocationPermission,
} from '../helpers/permissions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [region, setRegion] = useState({
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    _checkPermission();
  }, []);

  const _checkPermission = () => {
    checkPermissions().location.then((result) => {
      if (result === 'granted') {
        _getCurrentPosition();
      } else {
        requestLocationPermission(
          () => {
            _getCurrentPosition();
          },
          () => {
            Alert.alert('Lütfen lokasyon iznini veriniz.');
          }
        );
      }
    });
  };

  const _getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setRegion(coords);
        _setLocation(coords);
      },
      null,
      {
        timeout: 3000,
      }
    );
  };

  const _setLocation = (coords) => {
    setMarkerCoordinate(coords);
    dispatch({
      type: SET_LOCATION,
      payload: coords,
    });
  };

  if (!region.latitude) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Map */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onDoublePress={(e) => {
          _setLocation(e.nativeEvent.coordinate);
        }}
      >
        <Marker
          draggable
          coordinate={markerCoordinate}
          onDragEnd={(e) => _setLocation(e.nativeEvent.coordinate)}
        />
      </MapView>
      {/* List of youtube videos by location */}
      <VideoList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loaderCont: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
