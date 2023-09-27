import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateStr from "../dateStr";
import { useNavigation } from "@react-navigation/native";

const DayPicker = ({ date, onDayChange }) => {
  const navigation = useNavigation();
  const isToday = date == DateStr.today();
  const [dateStr, setDateStr] = useState(DateStr.humanize(date));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateStr(DateStr.humanize(date));
    }, 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  const updateDay = (day) => {
    onDayChange(day);
    setDateStr(DateStr.humanize(day));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{dateStr}</Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => updateDay(DateStr.decDay(date))}>
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
          onPress={() => updateDay(DateStr.incDay(date))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  controlButton: {},
});

export default DayPicker;
