import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import DateStr from "../dateStr"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const generateIcons = (dayData) => {
  if (dayData === undefined) {
    return "";
  }
  const icons = [
    { iconName: "leaf", macro: "vegetables" },
    { iconName: "food-steak", macro: "proteins" },
    { iconName: "baguette", macro: "carbs" },
    { iconName: "peanut", macro: "fats" },
  ];
  if (dayData.fruits !== null) {
    icons.push({ iconName: "food-apple", macro: "fruits" });
  }
  if (dayData.water !== null) {
    icons.push({ iconName: "water", macro: "water" });
  }

  return (
    <View style={styles.iconsContainer}>
      {icons.map(({ iconName, macro }) => {
        return (
          <MaterialCommunityIcons
            key={macro}
            size={ICON_SIZE}
            name={iconName}
            color={dayData[macro]}
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

ICON_SIZE = 10;
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
});

export default CalendarMacroDay;
