import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import DateStr from "../dateStr";

const macroToImage = {
  vegetables: require("../../assets/macro-vegetables-outline.png"),
  proteins: require("../../assets/macro-proteins-outline.png"),
  carbs: require("../../assets/macro-carbs-outline.png"),
  fats: require("../../assets/macro-fats-outline.png"),
  fruits: require("../../assets/macro-fruits-outline.png"),
  water: require("../../assets/macro-water-outline.png"),
  strength: require("../../assets/objective-strength-outline.png"),
  cardio: require("../../assets/objective-cardio-outline.png"),
  meditate: require("../../assets/objective-meditate-outline.png"),
  alcohol: require("../../assets/objective-alcohol-outline.png"),
  burger: require("../../assets/objective-burger-outline.png"),
  cheat: require("../../assets/failure.png"),
};

const generateIcons = (dayData) => {
  if (dayData === undefined) {
    return "";
  }
  return (
    <View style={styles.iconsContainer}>
      {Object.entries(dayData).map(([key, color]) => {
        return (
          <Image
            key={key}
            style={{ ...styles.icon, tintColor: color }}
            source={macroToImage[key]}
          />
        );
      })}
    </View>
  );
};
const CalendarMacroDay = ({ date, dayData, onDayPress }) => {
  const dateStr = date.dateString;
  var fontColor = "black";
  const today = DateStr.today();
  const todayMs = Date.now();
  if (date.timestamp > todayMs) {
    fontColor = "grey";
  }
  if (dateStr === today) {
    fontColor = "#00adf5";
  }
  return (
    <TouchableOpacity
      key={dateStr}
      onPress={() => {
        onDayPress(date);
      }}
      disabled={date.timestamp > todayMs}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <Text style={{ ...styles.dayText, color: fontColor }}>{date.day}</Text>
        {generateIcons(dayData)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayText: {
    fontSize: 15,
  },
  iconsContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  icon: {
    width: 10,
    height: 10,
    marginHorizontal: 1,
    marginBottom: 1,
  },
});

export default React.memo(CalendarMacroDay);
