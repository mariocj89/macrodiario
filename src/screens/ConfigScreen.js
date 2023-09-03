import { React, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import MaxInput from "../components/MaxInput";
import StateContext from "../context/stateProvider";
import { Button } from "react-native";
import Storage from "../storage";
import { useNavigation } from "@react-navigation/native";
import ToggleInput from "../components/ToggleInput";

const ConfigScreen = () => {
  const navigation = useNavigation();
  const confirmDeleteAllData = () => {
    Alert.alert(
      "Borrar todos los datos",
      "Estas seguro de que quieres borrar todos los datos de la App?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          onPress: async () => {
            await Storage.deleteAllData();
            navigation.navigate("Start");
          },
        },
      ],
    );
  };

  const [state, manager] = useContext(StateContext);
  const maxTakes = state.dayData.maxTakes;
  const objectives = state.dayData.objectivesConfig;
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
      help: "Activa para llevar el conteo de raciones de fruta por separado."
    },
    {
      title: "Agua",
      key: "water",
      image: require("../../assets/macro-water.png"),
      help: "Rastrea tu ingesta diaria de agua y mantén una hidratación óptima.",
    },
  ];
  const extraObjectivesInputs = [
    {
      image: require("../../assets/objective-strength.png"),
      key: "strength",
      title: "Fuerza/Gym",
      help: "Registra tus días de ejercicio de fuerza y actividades en el gimnasio semanal.",
    },
    {
      image: require("../../assets/objective-cardio.png"),
      key: "cardio",
      title: "Cardio",
      help: "Registra tus días de cardio y deporte semanal.",
    },
    {
      image: require("../../assets/objective-meditate.png"),
      key: "meditate",
      title: "Meditación/Relax",
      help: "Registra tus días de meditacion, relajacion o mindfulness semanal.",
    },
    {
      image: require("../../assets/objective-alcohol.png"),
      title: "Alcohol",
      key: "alcohol",
      help: "Registra los días en que tomates alcohol durante la semana.",
    },
    {
      image: require("../../assets/objective-burger.png"),
      title: "Ultra procesados",
      key: "burger",
      help: "Registra los días que comistes ultra procesados durante la semana.",
    },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Raciones diarias:</Text>
      {macroConfigInputs.map(({ title, key, image, help }) => {
        return (
          <MaxInput
            macroImage={image}
            key={key}
            helpText={help}
            macroName={title}
            value={maxTakes[key]}
            onUpdateValue={(newValue) => {
              manager.setMaxTakes({ [key]: newValue });
            }}
          />
        );
      })}
      <View
        style={{
          marginVertical: 30,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={styles.header}>Objetivos Semanales:</Text>
      <View style={{}}>
        {extraObjectivesInputs.map(({ key, title, image, help }) => {
          return (
            <MaxInput
              style={{ marginHorizontal: 5 }}
              key={key}
              helpText={help}
              macroName={title}
              macroImage={image}
              value={objectives[key] ?? 0}
              onUpdateValue={(newValue) => {
                manager.setObjectiveConfig({ [key]: newValue });
              }}
            />
          );
        })}
      </View>
      <View
        style={{
          marginVertical: 30,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={styles.header}>Otras opciones:</Text>
      <View style={{}}>
        <ToggleInput
          style={{ marginHorizontal: 5 }}
          image={require("../../assets/cheat.png")}
          value={objectives.cheat}
          text="Permitir dias fallo"
          onValueChange={(newValue) => {
            manager.setObjectiveConfig({ cheat: newValue });
          }}
        />
      </View>
      <View
        style={{
          marginVertical: 30,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Button
        title="Borrar todos los datos"
        color="red"
        onPress={confirmDeleteAllData}
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
