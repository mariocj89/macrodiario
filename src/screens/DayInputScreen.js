import React, { useReducer } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import DayPicker from "../components/DayPicker";
import MacroInput from "../components/MacroInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Storage from "../storage";
import DateStr from "../dateStr";
import useDayState from "../hooks/useDayState";

DEFAULT_TAKES = {
  vegetables: 0,
  proteins: 0,
  carbs: 0,
  fats: 0,
  fruits: 0,
};
DEFAULT_MAX_TAKES = {
  vegetables: 7,
  proteins: 6,
  carbs: 5,
  fats: 3,
  fruits: 0,
};


const loadDayData = async (day, dispatch) => {
  const maxTakes = await Storage.getMaxTakes(day);
  const takes = await Storage.getDayTakes(day);
  dispatch({
    type: "load_day_data",
    payload: {
      takes: takes ?? DEFAULT_TAKES,
      maxTakes: maxTakes ?? DEFAULT_MAX_TAKES,
    },
  });
  if (maxTakes === null) {
    // First time setup
    // User might rely on the default values, so we need to save them.
    // otherwise the calendar screen will fail to load, as we expect
    // loadMaxTakes to always return something
    Storage.saveMaxTakes(day, DEFAULT_MAX_TAKES);
  }
};


const DayInputScreen = ({ navigation, route }) => {
  const [state, dispatch] = useDayState();
  const date = state.date;
  var dayData = state.dayData;
  if (state.dayData === null) {
    loadDayData(date, dispatch);
    dayData = { takes: null, maxTakes: null }; // Allow to load to prevent blinking
  }
  const isToday = date === DateStr.today();
  const takes = dayData.takes ?? DEFAULT_TAKES;
  const maxTakes = dayData.maxTakes ?? DEFAULT_MAX_TAKES;
  const fruitsEnabled = maxTakes.fruits > 0;

  return (
    <>
      <View style={styles.controlHeader}>
        <View>
          <DayPicker
            style={styles.dayPicker}
            date={date}
            onDayChange={(day) => dispatch({type: "set_day", payload: day})}
          />
        </View>
        <View style={styles.controlHeader}>
          <TouchableOpacity
            disabled={!isToday}
            onPress={() => {
              navigation.navigate("Config", {
                maxTakes: maxTakes,
                dispatch: dispatch,
              });
            }}
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
          onTake={() => dispatch({ type: "take", payload: "vegetables" })}
          onUntake={() => dispatch({ type: "untake", payload: "vegetables" })}
        />
        <MacroInput
          macroTitle="Proteinas"
          macroSubtitle="Carne, pescado y huevos"
          marcoImage={require("../../assets/macro-proteins.png")}
          currentTakes={takes.proteins}
          maxTakes={maxTakes.proteins}
          onTake={() => dispatch({ type: "take", payload: "proteins" })}
          onUntake={() => dispatch({ type: "untake", payload: "proteins" })}
        />
        <MacroInput
          macroTitle="Carbohidratos"
          macroSubtitle="Pan, pasta, patata, arroz, legumbres"
          marcoImage={require("../../assets/macro-carbs.png")}
          currentTakes={takes.carbs}
          maxTakes={maxTakes.carbs}
          onTake={() => dispatch({ type: "take", payload: "carbs" })}
          onUntake={() => dispatch({ type: "untake", payload: "carbs" })}
        />
        <MacroInput
          macroTitle="Grasas"
          macroSubtitle="Aceite, yogurt, frutos secos"
          marcoImage={require("../../assets/macro-fats.png")}
          currentTakes={takes.fats}
          maxTakes={maxTakes.fats}
          onTake={() => dispatch({ type: "take", payload: "fats" })}
          onUntake={() => dispatch({ type: "untake", payload: "fats" })}
        />
        {fruitsEnabled ? (
          <MacroInput
            macroTitle="Frutas"
            macroSubtitle=""
            marcoImage={require("../../assets/macro-fruits.png")}
            currentTakes={takes.fruits}
            maxTakes={maxTakes.fruits}
            onTake={() => dispatch({ type: "take", payload: "fruits" })}
            onUntake={() => dispatch({ type: "untake", payload: "fruits" })}
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
