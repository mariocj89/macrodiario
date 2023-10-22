import i18n from "../../i18n";
import Storage from "../storage";
import * as Localization from "expo-localization";
import { LocaleConfig } from "react-native-calendars";

const StartScreen = ({ navigation }) => {
  const checkFirstLoad = async () => {
    const isFirstLoad = await Storage.isFirstTimeStartup();
    const globalValues = await Storage.getGlobalValues();
    if (!globalValues.language) {
      globalValues.language = Localization.language.startsWith("es")
        ? "es"
        : "en";
      await Storage.setGlobalValues(globalValues);
    }
    i18n.changeLanguage(globalValues.language);
    LocaleConfig.defaultLocale = globalValues.language;
    if (isFirstLoad) {
      navigation.replace("Help");
    } else {
      navigation.replace("DayInput");
    }
  };
  checkFirstLoad();
};

export default StartScreen;
