/**
 * Tmob Case
 * @author Devran Şimşek
 */

import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Provider} from 'react-redux';
import {useDispatch} from 'react-redux';
import {SET_LOCATION} from './src/actions/types';
import {store} from './src/sagas/store';
import HomeScreen from './src/screens/HomeScreen';

navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;

/**
 * react-native-maps AIzaSyBfRdiLDWueb_WSPmq11eAhBTXqD38Lf3Q
 * youtube AIzaSyC33Rvt71SZQX1ebrodT3VAYpzc7eqW-tA
 * navigation
 *
 */
