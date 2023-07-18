import Storage from "../storage";
import DateStr from "../dateStr";

const StartScreen = ({ navigation }) => {
  const checkFirstLoad = async () => {
    const isFirstLoad = await Storage.isFirstTimeStartup();
    if (isFirstLoad) {
      navigation.replace("Help");
      Storage.saveMaxTakes(DateStr.today(), {
        vegetables: 7,
        proteins: 7,
        carbs: 7,
        fats: 7,
      });
    } else {
      navigation.replace("DayInput");
    }
  };
  checkFirstLoad();
};

export default StartScreen;
