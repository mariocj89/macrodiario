import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DayInputScreen from "./src/screens/DayInputScreen";
import ConfigScreen from "./src/screens/ConfigScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { StateProvider } from "./src/context/stateProvider";

const Stack = createStackNavigator();
export default function App() {
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: "Macro Diario",
            headerStyle: { backgroundColor: "rgba(183,226,111,5)" },
            headerBackTitle: "Volver",
          }}
        >
          <Stack.Screen name="DayInput" component={DayInputScreen} />
          <Stack.Screen
            name="Config"
            component={ConfigScreen}
            options={{
              headerTitle: "Configuración",
              headerBackTitle: "Guardar",
            }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              headerTitle: "Calendario",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
