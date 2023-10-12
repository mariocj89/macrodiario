import { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Storage from "../storage";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";
import MacroRadar from "../components/MacroRadar";
import MacroPie from "../components/MacroPie";
import MacroUtils from "../macroUtils";
import ErrorBoundary from "../components/ErrorBoundary";
import SwitchSelector from "react-native-switch-selector";
import MacroCalendar from "../components/MacroCalendar";

const aggregateData = (data) => {
  var maxTakes = {};
  var takes = {};
  for (const [date, dayData] of Object.entries(data)) {
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
  const [range, setRange] = useState("month");
  const [state, manager] = useContext(StateContext);
  const [[calendarData, statisticsData], setData] = useState([{},{}]);
  const loadMonthData = async (year, month) => {
    console.log(`Updating month data to: ${year}-${month}`);
    const result = await Storage.getMonthData(year, month);
    setData([result, result]);
  };
  const loadWeekData = async (date) => {
    console.log(`Updating week data to week of: ${date}`);
    const weekData = await Storage.getWeekData(date);
    var result = {};
    // We are not able to detect a week change... so we load a whole year.
    for (let delta = -6; delta < 6; delta++) {
      var d = new Date(state.date);
      d.setMonth(d.getMonth() + delta);
      const monthResult = await Storage.getMonthData(
        d.getFullYear(),
        d.getMonth()
      );
      result = { ...result, ...monthResult };
    }
    setData([result, weekData]);
  };
  const initialLoad = (range) => {
    if (range === "week") {
      loadWeekData(state.date);
    }
    if (range === "month") {
      loadMonthData(
        new Date(state.date).getFullYear(),
        new Date(state.date).getMonth()
      );
    }
  };
  useEffect(() => {
    initialLoad(range);
  }, []);

  const [takes, maxTakes] = aggregateData(statisticsData);
  return (
    <>
      <SwitchSelector
        borderRadius={0}
        buttonColor="rgba(183,226,111,5)"
        options={[
          { label: "Semana", value: "week" },
          { label: "Mes", value: "month" },
        ]}
        initial={range === "week" ? 0 : 1}
        onPress={(value) => {
          setRange(value);
          initialLoad(value);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {range === "month" ? (
          <MacroCalendar.MonthMacroCalendar
            date={state.date}
            monthData={calendarData}
            onMonthChange={(date) => {
              loadMonthData(date.year, date.month - 1, loadMonthData);
            }}
            onDayPress={(date) => {
              const newDate = DateStr.dateToStr(new Date(date.dateString));
              manager.setDay(newDate);
              navigation.navigate("DayInput");
            }}
          />
        ) : (
          <MacroCalendar.WeekMacroCalendar
            date={state.date}
            weekData={calendarData}
            onWeekChange={(date) => {
              // TODO: This is unused :(
              loadWeekData(date);
            }}
            onDayPress={(date) => {
              console.log("Pressed day: ", date)
              const newDate = DateStr.dateToStr(new Date(date.dateString));
              manager.setDay(newDate);
              navigation.navigate("DayInput");
            }}
          />
        )}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 25, alignSelf: "center", marginVertical: 15 }}>
          Estadísticas {range === "month" ? "Mensuales" : "Semanales"}
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <ErrorBoundary>
          <MacroPie takes={takes} maxTakes={maxTakes} />
        </ErrorBoundary>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 30,
          }}
        />
        <ErrorBoundary>
          <MacroRadar maxTakes={maxTakes} takes={takes} />
        </ErrorBoundary>
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  );
};

export default CalendarScreen;
