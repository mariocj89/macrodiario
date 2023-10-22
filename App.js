import "./i18n";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DayInputScreen from "./src/screens/DayInputScreen";
import ConfigScreen from "./src/screens/ConfigScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { StateProvider } from "./src/context/stateProvider";
import HelpScreen from "./src/screens/HelpScreen";
import StartScreen from "./src/screens/StartScreen";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();
export default function App() {
  const { t } = useTranslation();
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: "Macro Diario",
            headerStyle: {
              backgroundColor: "rgba(183,226,111,5)",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            },
            headerBackTitle: t("Volver"),
          }}
        >
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="DayInput"
            component={DayInputScreen}
            options={({ navigation, route }) => ({
              headerLeft: () => null, // Remove back
            })}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="Config"
            component={ConfigScreen}
            options={{
              headerTitle: t("Configuración"),
              headerBackTitle: t("Guardar"),
            }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              headerTitle: t("Calendario"),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
