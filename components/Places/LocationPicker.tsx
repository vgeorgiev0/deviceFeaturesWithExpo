import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/Colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { getMapPreview } from '../../utils/location';

type Props = {};

const LocationPicker = (props: Props) => {
  const [pickedLocation, setPickedLocation] = useState({
    lat: 0,
    lng: 0,
  });

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
    setPickedLocation({
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude,
    });

    console.log(pickedLocation);
  };
  const pickOnMapHandler = async () => {};

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
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
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
});
