import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ElevatedView from "react-native-elevated-view";

const MacroInput = ({
  marcoImage,
  macroTitle,
  macroSubtitle,
  currentTakes,
  maxTakes,
  onTake,
  onUntake,
}) => {
  const pendingTakes = maxTakes - currentTakes;
  const overTakes = currentTakes - maxTakes;
  var inputsConfig = [];
  var id = 0;
  for (var i = 1; i <= Math.min(currentTakes, maxTakes); i++) {
    inputsConfig.push({
      id: id++,
      onPress: onUntake,
      image: require("../../assets/progress-complete.png"),
    });
  }
  for (var i = 1; i <= pendingTakes; i++) {
    inputsConfig.push({
      id: id++,
      onPress: onTake,
      image: require("../../assets/progress-pending.png"),
    });
  }
  for (var i = 1; i <= overTakes; i++) {
    inputsConfig.push({
      id: id++,
      onPress: onUntake,
      image: require("../../assets/progress-over.png"),
    });
  }
  if (pendingTakes <= 0) {
    inputsConfig.push({
      id: id++,
      onPress: onTake,
      image: require("../../assets/progress-add.png"),
    });
  }
  return (
    <ElevatedView style={styles.container} elevation={5}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={marcoImage} style={styles.image} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{macroTitle}</Text>
          <Text style={styles.subtitle}>{macroSubtitle}</Text>
        </View>
      </View>
      <View style={styles.inputsContainer}>
        {inputsConfig.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.onPress}>
            <Image style={styles.inputIcon} source={item.image} />
          </TouchableOpacity>
        ))}
      </View>
    </ElevatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(181, 181, 181, 0.3)",
  },
  header: {
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#f0fbf2",
    borderRadius: 15,
  },
  inputIcon: {
    margin: 5,
    width: 40,
    height: 40,
  },
  titleContainer: {
    padding: 5,
    flexDirection: "column",
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  subtitle: {},
  imageContainer: {
    padding: 10,
    backgroundColor: "#d3fdd8",
    borderRadius: 15,
  },
  image: {
    width: 40,
    height: 40,
  },
  inputsContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default MacroInput;
