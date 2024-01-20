import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const NearbyHospitals = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Add markers for nearby hospitals */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Hospital 1"
          description="Description of Hospital 1"
        />
        <Marker
          coordinate={{ latitude: 37.77925, longitude: -122.4224 }}
          title="Hospital 2"
          description="Description of Hospital 2"
        />
        {/* Add more markers as needed */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default NearbyHospitals;
