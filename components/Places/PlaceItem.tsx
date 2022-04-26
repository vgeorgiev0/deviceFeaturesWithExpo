import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface Props {
  place: Place;
  onSelect: () => void;
}

const PlaceItem: React.FC<Props> = ({ place, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View>
        <Image source={{ uri: place.imageUri }} />
      </View>

      <View>
        <Text>Title</Text>
        <Text>Address</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
