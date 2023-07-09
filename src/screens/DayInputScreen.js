import {React, useContext} from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import DayPicker from "../components/DayPicker";
import MacroInput from "../components/MacroInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";

const DayInputScreen = ({ navigation }) => {
  const [state, manager] = useContext(StateContext);
  const date = state.date;
  const dayData = state.dayData;
  const isToday = date === DateStr.today();
  const takes = dayData.takes;
  const maxTakes = dayData.maxTakes;
  const fruitsEnabled = maxTakes.fruits > 0;

  const incTakes = (macro) => {
    manager.setTakes({
      [macro]: takes[macro] + 1,
    });
  };
  const decTakes = (macro) => {
    manager.setTakes({
      [macro]: takes[macro] - 1,
    });
  };

  return (
    <>
      <View style={styles.controlHeader}>
        <View>
          <DayPicker
            style={styles.dayPicker}
            date={date}
            onDayChange={manager.setDay}
          />
        </View>
        <View style={styles.controlHeader}>
          <TouchableOpacity
            disabled={!isToday}
            onPress={() => navigation.navigate("Config")}
          >
            <MaterialCommunityIcons
              style={styles.controlButton}
              color={isToday ? "black" : "grey"}
              name={isToday ? "cog" : "cog-off"}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.controlButton}
              name="help-circle-outline"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.macroContainers}>
        <MacroInput
          macroTitle={
            fruitsEnabled
              ? "Verduras y Hortalizas"
              : "Verduras, Frutas y Hortalizas"
          }
          macroSubtitle=""
          marcoImage={require("../../assets/macro-vegetables.png")}
          currentTakes={takes.vegetables}
          maxTakes={maxTakes.vegetables}
          onTake={() => incTakes("vegetables")}
          onUntake={() => decTakes("vegetables")}
        />
        <MacroInput
          macroTitle="Proteinas"
          macroSubtitle="Carne, pescado y huevos"
          marcoImage={require("../../assets/macro-proteins.png")}
          currentTakes={takes.proteins}
          maxTakes={maxTakes.proteins}
          onTake={() => incTakes("proteins")}
          onUntake={() => decTakes("proteins")}
        />
        <MacroInput
          macroTitle="Carbohidratos"
          macroSubtitle="Pan, pasta, patata, arroz, legumbres"
          marcoImage={require("../../assets/macro-carbs.png")}
          currentTakes={takes.carbs}
          maxTakes={maxTakes.carbs}
          onTake={() => incTakes("carbs")}
          onUntake={() => decTakes("carbs")}
        />
        <MacroInput
          macroTitle="Grasas"
          macroSubtitle="Aceite, yogurt, frutos secos"
          marcoImage={require("../../assets/macro-fats.png")}
          currentTakes={takes.fats}
          maxTakes={maxTakes.fats}
          onTake={() => incTakes("fats")}
          onUntake={() => decTakes("fats")}
        />
        {fruitsEnabled ? (
          <MacroInput
            macroTitle="Frutas"
            macroSubtitle=""
            marcoImage={require("../../assets/macro-fruits.png")}
            currentTakes={takes.fruits}
            maxTakes={maxTakes.fruits}
            onTake={() => incTakes("fruits")}
            onUntake={() => decTakes("fruits")}
          />
        ) : null}
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  controlButton: {
    marginHorizontal: 5,
  },
  controlButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayPicker: {},
  controlHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  macroContainers: {
    padding: 10,
  },
});

export default DayInputScreen;
