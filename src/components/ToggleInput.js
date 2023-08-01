import { StyleSheet, View, Image, Switch, Text } from "react-native";
import ElevatedView from "react-native-elevated-view";
import { useState } from "react";

const ToggleInput = ({ image, value, onValueChange, text }) => {
  return (
    <ElevatedView style={styles.macroConfigContainer} elevation={5}>
      <View style={styles.iconContainer}>
        <Image style={styles.macroIcon} source={image} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{text}</Text>
        <View style={styles.numberContainer}>
          <Switch value={value} onValueChange={onValueChange} />
        </View>
      </View>
    </ElevatedView>
  );
};

const styles = StyleSheet.create({
  macroConfigContainer: {
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  inputContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  numberContainer: {
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  macroNumber: {
    minWidth: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    marginHorizontal: 15,
    fontSize: 30,
  },
  iconContainer: {
    backgroundColor: "#d3fdd8",
    margin: 5,
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  macroIcon: {
    backgroundColor: "#d3fdd8",
    width: 50,
    height: 50,
  },
});

export default ToggleInput;
