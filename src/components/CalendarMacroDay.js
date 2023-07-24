import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import DateStr from "../dateStr";

const generateIcons = (dayData) => {
  if (dayData === undefined) {
    return "";
  }
  const icons = [
    {
      image: require("../../assets/macro-vegetables-outline.png"),
      macro: "vegetables",
    },
    {
      image: require("../../assets/macro-proteins-outline.png"),
      macro: "proteins",
    },
    { image: require("../../assets/macro-carbs-outline.png"), macro: "carbs" },
    { image: require("../../assets/macro-fats-outline.png"), macro: "fats" },
  ];
  if (dayData.fruits != null) {
    icons.push({
      image: require("../../assets/macro-fruits-outline.png"),
      macro: "fruits",
    });
  }
  if (dayData.water != null) {
    icons.push({
      image: require("../../assets/macro-water-outline.png"),
      macro: "water",
    });
  }
  if (dayData.strength != null) {
    icons.push({
      image: require("../../assets/objective-strength-outline.png"),
      macro: "strength",
    });
  }
  if (dayData.cardio != null) {
    icons.push({
      image: require("../../assets/objective-cardio-outline.png"),
      macro: "cardio",
    });
  }
  if (dayData.meditate != null) {
    icons.push({
      image: require("../../assets/objective-meditate-outline.png"),
      macro: "meditate",
    });
  }

  return (
    <View style={styles.iconsContainer}>
      {icons.map(({ image, macro }) => {
        return (
          <Image
            key={macro}
            style={{ ...styles.icon, tintColor: dayData[macro] }}
            source={image}
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
