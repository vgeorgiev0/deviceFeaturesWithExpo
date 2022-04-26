import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import PlaceItem from './PlaceItem';

// @ts-ignore
const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      // @ts-ignore
      keyExtractor={(item) => {
        item.id;
      }}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() => {
            console.log('te');
          }}
        />
      )}
    />
  );
};
export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
