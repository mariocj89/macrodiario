import React, { useReducer } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import DayPicker from "../components/DayPicker";
import MacroInput from "../components/MacroInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Storage from "../storage";

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

const reducer = (state, action) => {
  console.log("Action: ", action, state);
  var takes = state.takes === null ? DEFAULT_TAKES : { ...state.takes };
  var maxTakes =
    state.maxTakes === null ? DEFAULT_MAX_TAKES : { ...state.maxTakes };
  const date = new Date(state.date);
  var macro;
  switch (action.type) {
    case "take":
      macro = action.payload;
      takes[macro] += 1;
      Storage.saveDayTakes(date, takes);
      return { ...state, takes: takes };
    case "untake":
      macro = action.payload;
      takes[macro] -= 1;
      Storage.saveDayTakes(date, takes);
      return { ...state, takes: takes };
    case "load_takes":
      return { ...state, takes: { ...takes, ...action.payload } };
    case "load_max_takes":
      return { ...state, maxTakes: { ...maxTakes, ...action.payload } };
    case "set_max_takes":
      maxTakes = { ...maxTakes, ...action.payload };
      Storage.saveMaxTakes(maxTakes);
      return { ...state, maxTakes: maxTakes };
    case "incDay":
      date.setDate(date.getDate() + 1);
      return { ...state, date: date, takes: null };
    case "decDay":
      date.setDate(date.getDate() - 1);
      return { ...state, date: date, takes: null };
    default:
      console.warn("Unexpected action: ", action);
      return state;
  }
};

const loadTakes = async (day, dispatch) => {
  const takes = await Storage.getDayTakes(day);
  dispatch({ type: "load_takes", payload: takes });
};
const loadMaxTakes = async (dispatch) => {
  const maxTakes = await Storage.getMaxTakes();
  dispatch({ type: "load_max_takes", payload: maxTakes });
};

const today = () => {
  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  return defaultDate;
};

const DayInputScreen = ({ navigation }) => {
  const defaultState = {
    date: today(),
    maxTakes: null,
    takes: null,
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  const date = state.date;
  if (state.takes === null) {
    loadTakes(date, dispatch);
  }
  if (state.maxTakes === null) {
    loadMaxTakes(dispatch);
  }
  const takes = state.takes ?? DEFAULT_TAKES;
  const maxTakes = state.maxTakes ?? DEFAULT_MAX_TAKES;
  const fruitsEnabled = maxTakes.fruits > 0;

  return (
    <>
      <View style={styles.controlHeader}>
        <View>
          <DayPicker
            style={styles.dayPicker}
            date={date}
            onIncDate={() => dispatch({ type: "incDay" })}
            onDecDate={() => dispatch({ type: "decDay" })}
          />
        </View>
        <View style={styles.controlHeader}>
          <TouchableOpacity onPress={()=>{navigation.navigate("Config", {maxTakes: maxTakes, dispatch: dispatch})}}>
            <MaterialCommunityIcons
              style={styles.controlButton}
              name="cog"
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
          macroTitle={fruitsEnabled? "Verduras y Hortalizas": "Verduras, Frutas y Hortalizas"}
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
        {
        fruitsEnabled? <MacroInput
          macroTitle="Frutas"
          macroSubtitle=""
          marcoImage={require("../../assets/macro-fruits.png")}
          currentTakes={takes.fruits}
          maxTakes={maxTakes.fruits}
          onTake={() => dispatch({ type: "take", payload: "fruits" })}
          onUntake={() => dispatch({ type: "untake", payload: "fruits" })}
        />: null
        }
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
