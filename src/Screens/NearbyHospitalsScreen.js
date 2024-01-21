import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

const NearbyHospitals = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/maps.png")} // replace with the actual path to your image
        style={styles.backgroundImage}
      >
        {/* Content inside the ImageBackground goes here */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
  },
});

export default NearbyHospitals;
