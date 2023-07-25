import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import ElevatedView from "react-native-elevated-view";
import { useContext } from "react";
import StateContext from "../context/stateProvider";

const ObjectivesInput = () => {
  const [state, manager] = useContext(StateContext);
  const { objectives, objectivesConfig } = state.dayData;
  const weekData = state.weekData;
  var objectivesInputs = [];
  if (objectivesConfig.strength > 0) {
    objectivesInputs.push({
      key: "strength",
      image: require("../../assets/objective-strength.png"),
    });
  }
  if (objectivesConfig.cardio > 0) {
    objectivesInputs.push({
      key: "cardio",
      image: require("../../assets/objective-cardio.png"),
    });
  }
  if (objectivesConfig.meditate > 0) {
    objectivesInputs.push({
      key: "meditate",
      image: require("../../assets/objective-meditate.png"),
    });
  }
  if (objectivesConfig.alcohol > 0) {
    objectivesInputs.push({
      key: "alcohol",
      image: require("../../assets/objective-alcohol.png"),
    });
  }
  if (objectivesConfig.burger > 0) {
    objectivesInputs.push({
      key: "burger",
      image: require("../../assets/objective-burger.png"),
    });
  }
  if (objectivesInputs.length == 0) {
    return;
  }
  return (
    <ElevatedView style={styles.container} elevation={5}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/objectives.png")}
            style={styles.image}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Objetivos Semanales</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputsContainer}>
        {objectivesInputs.map(({ key, image }) => (
          <TouchableOpacity
            onPress={() => {
              manager.toggleObjective(key);
            }}
            key={key}
            style={styles.objectiveContainer}
          >
            <Image style={styles.objectiveIcon} source={image} />
            <Image
              style={styles.addIcon}
              source={
                objectives[key]
                  ? weekData[key] <= objectivesConfig[key]
                    ? require("../../assets/progress-complete.png")
                    : require("../../assets/progress-over.png")
                  : require("../../assets/progress-add.png")
              }
            />
            <Text>
              {weekData[key] ?? 0}/{objectivesConfig[key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ElevatedView>
  );
};

const styles = StyleSheet.create({
  objectiveIcon: {
    margin: 5,
    marginRight: 10,
    width: 50,
    height: 50,
  },
  addIcon: {
    margin: 5,
    marginRight: 10,
    width: 30,
    height: 30,
  },
  objectiveContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
  },
  container: {
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(181, 181, 181, 0.3)",
  },
  header: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fbf2",
    borderRadius: 15,
    width: "100%",
  },
  inputIcon: {
    margin: 5,
    width: 40,
    height: 40,
  },
  titleContainer: {
    padding: 5,
    flexDirection: "column",
    paddingLeft: 10,
    width: "80%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  subtitle: {
    flexWrap: "wrap",
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "#d3fdd8",
    borderRadius: 15,
  },
  image: {
    width: 40,
    height: 40,
  },
  portionImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  inputsContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default ObjectivesInput;
