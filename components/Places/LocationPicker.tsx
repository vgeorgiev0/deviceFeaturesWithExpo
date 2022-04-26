import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/Colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

type Props = {};

const LocationPicker = (props: Props) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'Nema tok');
      return false;
    }
    return false;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const userLocation = await getCurrentPositionAsync();
    console.log(userLocation);
  };
  const pickOnMapHandler = async () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon={'location'}>
          My Location
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon={'map'}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
