import { StyleSheet, View, ScrollView, Text } from "react-native";
import MaxInput from "../components/MaxInput";
import useDayState from "../hooks/useDayState";
import StateContext from "../context/stateProvider";
import { useContext } from "react";

const ConfigScreen = ({ route }) => {
  const [state, manager] = useContext(StateContext)
  const maxTakes = state.dayData.maxTakes;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Raciones diarias:</Text>
      <MaxInput
        macroImage={require("../../assets/macro-vegetables.png")}
        macroName="Verduras"
        value={maxTakes.vegetables}
        onUpdateValue={(newValue) => {
          manager.setMaxTakes({ vegetables: newValue });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-proteins.png")}
        macroName="Proteinas"
        value={maxTakes.proteins}
        onUpdateValue={(newValue) => {
          manager.setMaxTakes({ proteins: newValue });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-carbs.png")}
        macroName={"Carbohidratos"}
        value={maxTakes.carbs}
        onUpdateValue={(newValue) => {
          manager.setMaxTakes({ carbs: newValue });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-fats.png")}
        macroName="Grasas"
        value={maxTakes.fats}
        onUpdateValue={(newValue) => {
          manager.setMaxTakes({ fats: newValue });
        }}
      />
      <MaxInput
        macroImage={require("../../assets/macro-fruits.png")}
        macroName="Fruta"
        value={maxTakes.fruits}
        onUpdateValue={(newValue) => {
          manager.setMaxTakes({ fruits: newValue });
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
