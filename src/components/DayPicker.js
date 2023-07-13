import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateStr from "../dateStr";
import { useNavigation } from "@react-navigation/native";

const DayPicker = ({ date, onDayChange }) => {
  const navigation = useNavigation();
  var jsDate = new Date(date);
  const day = jsDate.toLocaleDateString("es-ES", { day: "numeric" });
  const month = jsDate.toLocaleDateString("es-ES", { month: "short" });
  var dateStr = `${day} / ${month[0].toUpperCase() + month.slice(1)}`;
  const isToday = date == DateStr.today();
  if (isToday) {
    dateStr = "Hoy";
  } else if (date === DateStr.decDay(DateStr.today())) {
    dateStr = "Ayer";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{dateStr}</Text>
      <TouchableOpacity onPress={() => onDayChange(DateStr.decDay(date))}>
        <MaterialCommunityIcons
          style={styles.controlButton}
          name="chevron-left"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
        <MaterialCommunityIcons
          style={styles.controlButton}
          name="calendar-month"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDayChange(DateStr.incDay(date))}
        disabled={isToday}
      >
        <MaterialCommunityIcons
          style={styles.controlButton}
          name="chevron-right"
          size={30}
          color={isToday ? "grey" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const ICON_HEIGHT = 20;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    width: 150,
  },
  controlButton: {},
});

export default DayPicker;
