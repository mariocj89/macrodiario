import { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Storage from "../storage";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";
import MacroRadar from "../components/MacroRadar";
import MacroCalendar from "../components/MacroCalendar";
import MacroPie from "../components/MacroPie";
import MacroUtils from "../macroUtils";
import ErrorBoundary from "../components/ErrorBoundary";

const aggregateMonthData = (monthData) => {
  var maxTakes = {};
  var takes = {};
  for (const [date, dayData] of Object.entries(monthData)) {
    if (dayData.maxTakes === null || dayData.takes === null) {
      continue;
    }
    for (const [macroKey, macro] of Object.entries(MacroUtils.translations)) {
      const value = dayData.maxTakes[macroKey];
      if (value === 0) {
        continue;
      }
      maxTakes[macro] = maxTakes[macro] ?? 0;
      maxTakes[macro] += value;
    }
    for (const [macroKey, macro] of Object.entries(MacroUtils.translations)) {
      const value = dayData.takes[macroKey];
      if (value === 0) {
        continue;
      }
      takes[macro] = takes[macro] ?? 0;
      takes[macro] += value;
    }
  }
  Object.keys(maxTakes).forEach((key) => {
    takes[key] = takes[key] ?? 0;
  });
  console.log("Aggregated maxTakes:", maxTakes);
  console.log("Aggregated takes:", takes);
  return [takes, maxTakes];
};

const CalendarScreen = ({ navigation }) => {
  const [state, manager] = useContext(StateContext);
  const [monthData, setMonthData] = useState({});
  const loadMonthData = async (year, month) => {
    const result = await Storage.getMonthData(year, month);
    setMonthData(result);
  };
  useEffect(() => {
    loadMonthData(
      new Date(state.date).getFullYear(),
      new Date(state.date).getMonth()
    );
  }, []);

  const [monthTakes, monthMaxTakes] = aggregateMonthData(monthData);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MacroCalendar
          date={state.date}
          monthData={monthData}
          onMonthChange={(date) => {
            loadMonthData(date.year, date.month - 1, loadMonthData);
          }}
          onDayPress={(date) => {
            const newDate = DateStr.dateToStr(new Date(date.dateString));
            manager.setDay(newDate);
            navigation.navigate("DayInput");
          }}
        />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 25, alignSelf: "center", marginVertical: 15 }}>
          Estadísticas mensuales
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <ErrorBoundary>
          <MacroPie takes={monthTakes} maxTakes={monthMaxTakes} />
        </ErrorBoundary>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 30,
          }}
        />
        <ErrorBoundary>
          <MacroRadar maxTakes={monthMaxTakes} takes={monthTakes} />
        </ErrorBoundary>
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  );
};

export default CalendarScreen;
