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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [range, setRange] = useState("month");
  const [state, manager] = useContext(StateContext);
  const [macroData, setData] = useState({});
  const [selectedDay, setSelectedDay] = useState(state.date);
  const loadMonthData = async (year, month) => {
    console.log(`Updating month data to: ${year}-${month}`);
    const result = await Storage.getMonthData(year, month);
    setData(result);
  };
  const loadWeekData = async (date) => {
    console.log(`Updating week data to week of: ${date}`);
    const weekData = await Storage.getWeekData(date);
    setData(weekData);
  };
  const initialLoad = (range) => {
    if (range === "week") {
      loadWeekData(selectedDay);
    }
    if (range === "month") {
      loadMonthData(
        new Date(selectedDay).getFullYear(),
        new Date(selectedDay).getMonth()
      );
    }
  };
  useEffect(() => {
    initialLoad(range);
  }, []);

  const [takes, maxTakes] = aggregateData(macroData);
  return (
    <>
      <SwitchSelector
        borderRadius={0}
        buttonColor="rgba(183,226,111,5)"
        options={[
          { label: t("Semana"), value: "week" },
          { label: t("Mes"), value: "month" },
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
            date={selectedDay}
            monthData={macroData}
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
            date={selectedDay}
            weekData={macroData}
            onWeekChange={(date) => {
              loadWeekData(date);
              setSelectedDay(date);
            }}
            onDayPress={(date) => {
              console.log("Pressed day: ", date);
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
          {range === "month"
            ? t("Estadísticas Mensuales")
            : t("Estadísticas Semanales")}
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
