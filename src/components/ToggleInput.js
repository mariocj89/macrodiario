import {
  StyleSheet,
  View,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ElevatedView from "react-native-elevated-view";

const ToggleInput = ({ image, value, onValueChange, text, helpText }) => {
  const onHelp = () => {
    Alert.alert("Ayuda", helpText, [
      {
        text: "OK",
      },
    ]);
  };
  return (
    <ElevatedView style={styles.macroConfigContainer} elevation={5}>
      <View style={styles.iconContainer}>
        <Image style={styles.macroIcon} source={image} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.inputHeader}>
          <Text style={styles.title}>{text}</Text>
          {helpText ? (
            <TouchableOpacity onPress={onHelp}>
              <MaterialCommunityIcons
                style={styles.controlButton}
                name="help-circle-outline"
                size={25}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.numberContainer}>
            <Switch value={value} onValueChange={onValueChange} />
          </View>
        </View>
      </View>
    </ElevatedView>
  );
};

const styles = StyleSheet.create({
  macroConfigContainer: {
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
  },
  inputContainer: {
    justifyContent: "center",
    alignSelf: "flex-end",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  macroNumber: {
    minWidth: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    marginHorizontal: 15,
    fontSize: 30,
  },
  iconContainer: {
    backgroundColor: "#d3fdd8",
    margin: 5,
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  macroIcon: {
    backgroundColor: "#d3fdd8",
    width: 50,
    height: 50,
  },
});

export default ToggleInput;
