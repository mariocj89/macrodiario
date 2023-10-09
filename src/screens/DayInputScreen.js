import { React, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import DayPicker from "../components/DayPicker";
import MacroInput from "../components/MacroInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";
import ObjectivesInput from "../components/ObjectivesInput";

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
  const { takes, maxTakes, objectives, objectivesConfig } = dayData;
  const fruitsEnabled = maxTakes.fruits > 0;
  const isCheatDay = objectives.cheat ?? false;
  const waterEnabled = maxTakes.water > 0;

  const markCheatDay = () => {
    Alert.alert(
      !isCheatDay ? "Marcar fallo" : "Quitar fallo",
      !isCheatDay
        ? "¿Quieres marcar el dia como fallido y que no cuente en las estadísticas?"
        : "¿Quieres volver a contar las tomas del dia de hoy?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Si",
          onPress: async () => {
            await manager.setCheatDay();
          },
        },
      ]
    );
  };
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
      title: "Verduras y Hortalizas",
      subtitle: "Lechuga, cebolla, tomate",
      key: "vegetables",
      image: require("../../assets/macro-vegetables.png"),
      portionImage: require("../../assets/info-fist.png"),
    },
    {
      title: "Proteínas",
      subtitle: "Carne, pescado, huevos, tofu",
      key: "proteins",
      image: require("../../assets/macro-proteins.png"),
      portionImage: require("../../assets/info-protein.png"),
    },
    {
      title: "Carbohidratos",
      subtitle: fruitsEnabled
        ? "Fruta, pan, pasta, patata"
        : "Pan, pasta, patata, arroz",
      key: "carbs",
      image: require("../../assets/macro-carbs.png"),
      portionImage: require("../../assets/info-carbs.png"),
    },
    {
      title: "Grasas",
      subtitle: "Aceite, aguacate, frutos secos",
      key: "fats",
      image: require("../../assets/macro-fats.png"),
      portionImage: require("../../assets/info-fats.png"),
    },
  ];
  if (fruitsEnabled) {
    macroInputs.push({
      title: "Frutas",
      subtitle: "",
      key: "fruits",
      image: require("../../assets/macro-fruits.png"),
      portionImage: require("../../assets/info-fist.png"),
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
  if (isCheatDay) {
    //macroInputs.length = 0;
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
          {objectivesConfig.cheat ? (
            <TouchableOpacity onPress={markCheatDay}>
              <Image
                style={styles.controlButton}
                source={
                  isCheatDay
                    ? require("../../assets/cheat.png")
                    : require("../../assets/cheat-outline.png")
                }
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
            <MaterialCommunityIcons
              style={styles.controlButton}
              name="chart-bar"
              size={25}
            />
          </TouchableOpacity>
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
      <ScrollView
        style={styles.macroContainers}
        showsVerticalScrollIndicator={false}
      >
        {macroInputs.map(({ title, subtitle, image, key, portionImage }) => {
          return (
            <MacroInput
              isCheatDay={isCheatDay}
              key={key}
              macroTitle={title}
              macroSubtitle={subtitle}
              marcoImage={image}
              portionImage={portionImage}
              currentTakes={takes[key]}
              maxTakes={maxTakes[key]}
              onTake={() => incTakes(key)}
              onUntake={() => decTakes(key)}
            />
          );
        })}
        <ObjectivesInput
          objectives={objectives}
          objectivesConfig={objectivesConfig}
          onObjectiveToggle={manager.toggleObjective}
        />
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  controlButton: {
    width: 25,
    height: 25,
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
