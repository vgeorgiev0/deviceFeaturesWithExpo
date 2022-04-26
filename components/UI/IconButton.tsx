import { StyleSheet, Text, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type Props = {
  icon: any;
  size: number;
  color: string | undefined;
  onPress: () => void;
};

const IconButton = (props: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={props.onPress}
    >
      <Ionicons name={props.icon} size={props.size} color={props.color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
