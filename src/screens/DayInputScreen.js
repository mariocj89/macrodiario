import { React, useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import DayPicker from "../components/DayPicker";
import MacroInput from "../components/MacroInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";

const DayInputScreen = ({ navigation }) => {
  const [state, manager] = useContext(StateContext);
  useEffect(() => {
    manager.setDay(DateStr.today());
  }, []);
  const date = state.date;
  const dayData = state.dayData;
  if (dayData === null) {
    return;
  }
  const isToday = date === DateStr.today();
  const takes = dayData.takes;
  const maxTakes = dayData.maxTakes;
  const fruitsEnabled = maxTakes.fruits > 0;
  const waterEnabled = maxTakes.water > 0;

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

  const macroInputs = [
    {
      title: fruitsEnabled
        ? "Verduras y Hortalizas"
        : "Verduras, Frutas y Hortalizas",
      subtitle: "",
      key: "vegetables",
      image: require("../../assets/macro-vegetables.png"),
    },
    {
      title: "Proteinas",
      subtitle: "Carne, pescado y huevos",
      key: "proteins",
      image: require("../../assets/macro-proteins.png"),
    },
    {
      title: "Carbohidratos",
      subtitle: "Pan, pasta, patata, arroz, legumbres",
      key: "carbs",
      image: require("../../assets/macro-carbs.png"),
    },
    {
      title: "Grasas",
      subtitle: "Aceite, yougurt, aguacate, frutos secos",
      key: "fats",
      image: require("../../assets/macro-fats.png"),
    },
  ];
  if (fruitsEnabled) {
    macroInputs.push({
      title: "Frutas",
      subtitle: "",
      key: "fruits",
      image: require("../../assets/macro-fruits.png"),
    });
  }
  if (waterEnabled) {
    macroInputs.push({
      title: "Agua",
      subtitle: "",
      key: "water",
      image: require("../../assets/macro-water.png"),
    });
  }

  return (
    <>
      <View style={styles.controlHeader}>
        <DayPicker
          style={styles.dayPicker}
          date={date}
          onDayChange={manager.setDay}
        />
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
          <TouchableOpacity onPress={() => navigation.navigate("Help")}>
            <MaterialCommunityIcons
              style={styles.controlButton}
              name="help-circle-outline"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.macroContainers}>
        {macroInputs.map(({ title, subtitle, image, key }) => {
          return (
            <MacroInput
              key={key}
              macroTitle={title}
              macroSubtitle={subtitle}
              marcoImage={image}
              currentTakes={takes[key]}
              maxTakes={maxTakes[key]}
              onTake={() => incTakes(key)}
              onUntake={() => decTakes(key)}
            />
          );
        })}
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
