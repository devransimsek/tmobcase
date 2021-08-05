import {Platform} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

let androidPerms = {
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

let iosPerms = {
  location: PERMISSIONS.IOS.LOCATION_ALWAYS,
};

export const checkPermissions = () => {
  if (Platform.OS === 'ios') {
    return {
      location: check(iosPerms.location),
    };
  } else {
    return {
      location: check(androidPerms.location),
    };
  }
};

export const requestLocationPermission = async (success, error) => {
  return request(
    Platform.select({
      ios: iosPerms.location,
      android: androidPerms.location,
    }),
  ).then(result => {
    if (result === 'blocked') {
      error();
    }
    if (result === 'granted') {
      success();
    }
  });
};
