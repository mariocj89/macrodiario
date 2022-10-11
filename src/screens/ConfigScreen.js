import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useState } from "react";
import MaxInput from "../components/MaxInput";

const ConfigScreen = ({ navigation }) => {
  const maxTakes = navigation.getParam("maxTakes");
  const dispatch = navigation.getParam("dispatch");
  return (
    <ScrollView style={styles.container}>
      <MaxInput
        macroImage={require("../../assets/macro-vegetables.png")}
        macroName="Verduras"
        value={maxTakes.vegetables}
        onUpdateValue={(newValue) => {
          const maxTakesDelta = { vegetables: newValue };
          dispatch({
            type: "set_max_takes",
            payload: maxTakesDelta,
          });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-proteins.png")}
        macroName="Proteinas"
        value={maxTakes.proteins}
        onUpdateValue={(newValue) => {
          const maxTakesDelta = { proteins: newValue };
          dispatch({
            type: "set_max_takes",
            payload: maxTakesDelta,
          });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-carbs.png")}
        macroName={"Carbohidratos"}
        value={maxTakes.carbs}
        onUpdateValue={(newValue) => {
          const maxTakesDelta = { carbs: newValue };
          dispatch({
            type: "set_max_takes",
            payload: maxTakesDelta,
          });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-fats.png")}
        macroName="Grasas"
        value={maxTakes.fats}
        onUpdateValue={(newValue) => {
          const maxTakesDelta = { fats: newValue };
          dispatch({
            type: "set_max_takes",
            payload: maxTakesDelta,
          });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-fruits.png")}
        macroName="Fruta"
        value={maxTakes.fruits}
        onUpdateValue={(newValue) => {
          const maxTakesDelta = { fruits: newValue };
          dispatch({
            type: "set_max_takes",
            payload: maxTakesDelta,
          });
        }}
      />
      <View style={{ height: 150 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  macroConfigContainer: {
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  numberContainer: {
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  macroNumber: {
    minWidth: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    marginHorizontal: 30,
    fontSize: 30,
  },
  iconContainer: {
    backgroundColor: "#d3fdd8",
    margin: 5,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  macroIcon: {
    backgroundColor: "#d3fdd8",
    width: 50,
    height: 50,
  },
});

export default ConfigScreen;
