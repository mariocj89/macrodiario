import { React, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import MaxInput from "../components/MaxInput";
import StateContext from "../context/stateProvider";
import { Button } from "react-native";
import Storage from "../storage";
import { useNavigation } from "@react-navigation/native";
import ToggleInput from "../components/ToggleInput";
import * as Notifications from "expo-notifications";
import DateStr from "../dateStr";
import PickerInput from "../components/PickerInput";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    const takes = Storage.getDayTakes(DateStr.today());
    if (takes) {
      console.log("Notifications wont be shown, user already has input data");
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    }
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

const scheduleNotifications = async () => {
  Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Macro Diario",
      body: i18n.t("¡No olvides anotar las tomas de hoy!"),
    },
    trigger: {
      hour: 14,
      minute: 0,
      repeats: true,
    },
  });
};

const ConfigScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const confirmDeleteAllData = () => {
    Alert.alert(
      i18n.t("Borrar todos los datos"),
      i18n.t("Estas seguro de que quieres borrar todos los datos de la App?"),
      [
        {
          text: t("Cancelar"),
          style: "cancel",
        },
        {
          text: t("Borrar"),
          onPress: async () => {
            await Storage.deleteAllData();
            navigation.navigate("Start");
          },
        },
      ]
    );
  };

  const [state, manager] = useContext(StateContext);
  const maxTakes = state.dayData.maxTakes;
  const objectives = state.dayData.objectivesConfig;
  const globalValues = state.globalValues;
  const macroConfigInputs = [
    {
      title: t("Verduras"),
      key: "vegetables",
      image: require("../../assets/macro-vegetables.png"),
    },
    {
      title: t("Proteínas"),
      key: "proteins",
      image: require("../../assets/macro-proteins.png"),
    },
    {
      title: t("Carbohidratos"),
      key: "carbs",
      image: require("../../assets/macro-carbs.png"),
    },
    {
      title: t("Grasas"),
      key: "fats",
      image: require("../../assets/macro-fats.png"),
    },
    {
      title: t("Fruta"),
      key: "fruits",
      image: require("../../assets/macro-fruits.png"),
      help: t(
        "Activa para llevar el conteo de raciones de fruta por separado."
      ),
    },
    {
      title: t("Lácteos"),
      key: "dairy",
      image: require("../../assets/macro-dairy.png"),
      help: t("Activa para llevar el conteo de lácteos por separado."),
    },
    {
      title: t("Agua"),
      key: "water",
      image: require("../../assets/macro-water.png"),
      help: t(
        "Rastrea tu ingesta diaria de agua y mantén una hidratación óptima."
      ),
    },
  ];
  const extraObjectivesInputs = [
    {
      image: require("../../assets/objective-strength.png"),
      key: "strength",
      title: t("Fuerza/Gym"),
      help: t(
        "Registra tus días de ejercicio de fuerza y actividades en el gimnasio semanal."
      ),
    },
    {
      image: require("../../assets/objective-cardio.png"),
      key: "cardio",
      title: t("Cardio"),
      help: t("Registra tus días de cardio y deporte semanal."),
    },
    {
      image: require("../../assets/objective-meditate.png"),
      key: "meditate",
      title: t("Meditación/Relax"),
      help: t(
        "Registra tus días de meditacion, relajacion o mindfulness semanal."
      ),
    },
    {
      image: require("../../assets/objective-alcohol.png"),
      title: t("Alcohol"),
      key: "alcohol",
      help: t("Registra los días en que tomastes alcohol durante la semana."),
    },
    {
      image: require("../../assets/objective-burger.png"),
      title: t("Ultra procesados"),
      key: "burger",
      help: t(
        "Registra los días que comistes ultra procesados durante la semana."
      ),
    },
  ];
  const enableNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permiso de notifiaciones rechazado");
      Alert.alert(
        t("Activacion manual necesaria"),
        t(
          "Para permitir que Macro Diario te envie notifications, primero has de darle permiso en los ajustes de tu dispositivo."
        ),
        [
          {
            text: "OK",
          },
        ]
      );
      manager.setObjectiveConfig({ reminders: false });
      return;
    }
    console.log("Permiso de notificaciones obtenido");
    scheduleNotifications();
  };
  if (globalValues.reminders === true) {
    console.log("Enabling scheduled notifications");
    enableNotifications();
  } else {
    console.log("Disabling all notifiacations");
    Notifications.cancelAllScheduledNotificationsAsync();
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{t("Raciones diarias")}:</Text>
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
      <Text style={styles.header}>{t("Objetivos Semanales")}:</Text>
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
      <Text style={styles.header}>{t("Otras opciones")}:</Text>
      <View style={{}}>
        <ToggleInput
          style={{ marginHorizontal: 5 }}
          image={require("../../assets/cheat.png")}
          value={objectives.cheat}
          helpText={t(
            "Permite marcar un dia como fallo y que no cuente para las estadisticas mensuales."
          )}
          text={t("Permitir días fallo")}
          onValueChange={(newValue) => {
            manager.setObjectiveConfig({ cheat: newValue });
          }}
        />
      </View>
      <View style={{}}>
        <ToggleInput
          style={{ marginHorizontal: 5 }}
          image={require("../../assets/notification.png")}
          value={globalValues.reminders}
          helpText={t(
            "Activa un recordatorio al medio dia por si se te olvida introducir las tomas."
          )}
          text={t("Activar recordatorios")}
          onValueChange={(newValue) => {
            manager.setGlobalValues({ reminders: newValue });
          }}
        />
      </View>
      <View style={{}}>
        <PickerInput
          style={{ marginHorizontal: 5 }}
          image={require("../../assets/languages.png")}
          value={globalValues.language ?? "es"}
          helpText={t("Elige el idioma de la applicación.")}
          text={t("Idioma")}
          onValueChange={(newValue) => {
            i18n.changeLanguage(newValue);
            manager.setGlobalValues({ language: newValue });
          }}
          options={[
            { label: t("Español"), value: "es" },
            { label: t("Inglés"), value: "en" },
          ]}
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
        title={t("Borrar todos los datos")}
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
