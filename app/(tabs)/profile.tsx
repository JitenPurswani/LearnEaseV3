import { Text, View,StyleSheet,Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.centeredLogoContainer}>
      <Image
        source={require("../../assets/images/LE_Logo_light.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredLogoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
  },
})
