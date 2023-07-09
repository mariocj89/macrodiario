import { React, useContext } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MaxInput from "../components/MaxInput";
import StateContext from "../context/stateProvider";

const ConfigScreen = () => {
  const [state, manager] = useContext(StateContext);
  const maxTakes = state.dayData.maxTakes;
  const macroConfigInputs = [
    {
      title: "Verduras",
      key: "vegetables",
      image: require("../../assets/macro-vegetables.png"),
    },
    {
      title: "Proteinas",
      key: "proteins",
      image: require("../../assets/macro-proteins.png"),
    },
    {
      title: "Carbohidratos",
      key: "carbs",
      image: require("../../assets/macro-carbs.png"),
    },
    {
      title: "Grasas",
      key: "fats",
      image: require("../../assets/macro-fats.png"),
    },
    {
      title: "Fruta",
      key: "fruits",
      image: require("../../assets/macro-fruits.png"),
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Raciones diarias:</Text>
      {macroConfigInputs.map(({ title, key, image }) => {
        return (
          <MaxInput
            macroImage={image}
            key={key}
            macroName={title}
            value={maxTakes[key]}
            onUpdateValue={(newValue) => {
              manager.setMaxTakes({ [key]: newValue });
            }}
          />
        );
      })}
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
