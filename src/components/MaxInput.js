import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ElevatedView from "react-native-elevated-view";
import { useState } from "react";

const MaxInput = ({
  macroImage,
  macroName,
  value,
  onUpdateValue,
  helpText,
}) => {
  const [macroValue, setMacroValue] = useState(value);
  const updateValue = (newValue) => {
    if (newValue < 0) {
      return;
    }
    setMacroValue(newValue);
    onUpdateValue(newValue);
  };
  const onHelp = () => {
    Alert.alert("Ayuda", helpText, [
      {
        text: "OK",
      },
    ]);
  };
  return (
    <ElevatedView style={styles.macroConfigContainer} elevation={5}>
      <View style={styles.iconContainer}>
        <Image style={styles.macroIcon} source={macroImage} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.inputHeader}>
          <Text style={styles.title}>{macroName}</Text>
          {helpText ? (
            <TouchableOpacity onPress={onHelp}>
              <MaterialCommunityIcons
                style={styles.controlButton}
                name="help-circle-outline"
                size={25}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
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
    backgroundColor: "white",
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    justifyContent: "center",
    alignSelf: "flex-end",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  numberContainer: {
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
