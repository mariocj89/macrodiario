import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DayPicker = ({ date, onIncDate, onDecDate }) => {
  var today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time
  const diffTime = Math.abs(today - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const day = date.toLocaleDateString("es-ES", {day: 'numeric'});
  const month = date.toLocaleDateString("es-ES", { month: 'short'});
  var dateStr = `${day} / ${month[0].toUpperCase() + month.slice(1)}`
  if (diffDays === 0) {
    dateStr = "Hoy";
  } else if (diffDays === 1) {
    dateStr = "Ayer";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{dateStr}</Text>
      <TouchableOpacity onPress={onDecDate}>
        <MaterialCommunityIcons
          style={styles.controlButton}
          name="chevron-left"
          size={30}
        />
      </TouchableOpacity>
      <MaterialCommunityIcons
        style={styles.controlButton}
        name="calendar-month"
        size={25}
      />
      {diffDays > 0 ? (
        <TouchableOpacity onPress={onIncDate}>
          <MaterialCommunityIcons
            style={styles.controlButton}
            name="chevron-right"
            size={30}
          />
        </TouchableOpacity>
      ) : null}
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
