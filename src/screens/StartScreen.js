import Storage from "../storage";
import DateStr from "../dateStr";

const StartScreen = ({ navigation }) => {
  const checkFirstLoad = async () => {
    const isFirstLoad = await Storage.isFirstTimeStartup();
    if (isFirstLoad) {
      navigation.replace("Help");
    } else {
      navigation.replace("DayInput");
    }
  };
  checkFirstLoad();
};

export default StartScreen;
