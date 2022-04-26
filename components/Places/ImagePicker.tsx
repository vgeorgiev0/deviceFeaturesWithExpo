import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';
import OutlinedButton from '../UI/OutlinedButton';

type Props = {};

const ImagePicker = (props: Props) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const takeImageHandler = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    if (!image) {
      return;
    }

    if (image.cancelled) {
      Alert.alert('Canceled');
      return;
    }
    setImageUri(image.uri);
  };

  let imagePreview = <Text> No image taken yet.</Text>;

  if (imageUri) {
    imagePreview = <Image source={{ uri: imageUri }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon={'camera'} onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
});
