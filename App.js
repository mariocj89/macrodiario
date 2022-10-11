import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DayInputScreen from "./src/screens/DayInputScreen";
import ConfigScreen from "./src/screens/ConfigScreen";

const navigator = createStackNavigator(
  {
    DayInput: DayInputScreen,
    Config: {
      screen: ConfigScreen,
      navigationOptions: {
        title: "Configuración",
        headerBackTitle: "Guardar",
      }
    }
  },
  {
    initialRouteName: "DayInput",
    defaultNavigationOptions: {
      title: "Macro Diario",
      headerBackTitle: "Volver",
    },
  }
);

export default createAppContainer(navigator);
