import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ElevatedView from "react-native-elevated-view";
import { useState } from "react";

const MaxInput = ({ macroImage, macroName, value, onUpdateValue }) => {
  const [macroValue, setMacroValue] = useState(value);
  const updateValue = (newValue) => {
    if (newValue < 0) {
      return;
    }
    setMacroValue(newValue);
    onUpdateValue(newValue);
  };
  return (
    <ElevatedView style={styles.macroConfigContainer} elevation={5}>
      <View style={styles.iconContainer}>
        <Image style={styles.macroIcon} source={macroImage} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{macroName}</Text>
        <View style={styles.numberContainer}>
          <TouchableOpacity
            disabled={value === 0}
            onPress={() => {
              updateValue(macroValue - 1);
            }}
          >
            <MaterialCommunityIcons
              name="minus"
              size={45}
              color={value !== 0 ? "green" : "grey"}
            />
          </TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            style={styles.macroNumber}
            onChangeText={(text) => {
              const newNumber = text.replace(/[^0-9]/g, "");
              if (newNumber.length === 0) {
                return;
              }
              updateValue(parseInt(newNumber, 10));
            }}
            maxLength={2}
          >
            {macroValue}
          </TextInput>
          <TouchableOpacity
            onPress={() => {
              updateValue(macroValue + 1);
            }}
          >
            <MaterialCommunityIcons name="plus" size={45} color="green" />
          </TouchableOpacity>
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
  },
  macroIcon: {
    backgroundColor: "#d3fdd8",
    width: 50,
    height: 50,
  },
});

export default MaxInput;
