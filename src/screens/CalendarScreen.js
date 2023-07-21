import { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import Storage from "../storage";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";
import PolarChart from "../components/PolarChart";
import { VictoryPie } from "victory-native";
import MacroCalendar from "../components/MacroCalendar";


const translation = {
  vegetables: "Verduras",
  proteins: "Proteinas",
  fats: "Grasas",
  carbs: "Carbohidratos",
  fruits: "Fruta",
};

const color = (takes, maxTakes) => {
  if (maxTakes === 0) {
    return null;
  }
  if (takes == maxTakes) {
    return "green";
  }
  if (takes > maxTakes) {
    return "red";
  }
  return "#ffea00";
};

const colorLegend = (color, text) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 25,
          height: 25,
          borderWidth: 1,
          marginRight: 10,
          backgroundColor: color,
        }}
      />
      <Text>{text}</Text>
    </View>
  );
};

const loadAggregatedData = async (year, month, action) => {
  const monthData = await Storage.getMonthData(year, month);
  var maxTakes = {};
  var takes = {};
  for (const [date, dayData] of Object.entries(monthData)) {
    for (const [macroKey, macro] of Object.entries(translation)) {
      const value = dayData.maxTakes[macroKey];
      if (value === 0) {
        continue;
      }
      maxTakes[macro] = maxTakes[macro] ?? 0;
      maxTakes[macro] += value;
    }
    for (const [macroKey, macro] of Object.entries(translation)) {
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
  action([maxTakes, takes]);
};

const CalendarScreen = ({ navigation }) => {
  const [monthData, setMonthData] = useState({});
  const loadMonthData = async (year, month) => {
    const result = await Storage.getMonthData(year, month);
    setMonthData(result);
  };

  const width = Dimensions.get("window").width;
  const [state, manager] = useContext(StateContext);
  const [calendarDayData, setCalendarDayData] = useState({});
  const [[maxTakes, takes], setSummaryData] = useState([{}, {}]);
  useEffect(() => {
    loadMonthData(
      new Date(state.date).getFullYear(),
      new Date(state.date).getMonth(),
    );
    loadAggregatedData(
      new Date(state.date).getFullYear(),
      new Date(state.date).getMonth(),
      setSummaryData
    );
  }, []);
  var pieData = [];
  var pieColors = [];
  for (const [macro, value] of Object.entries(takes)) {
    pieColors.push(color(value, maxTakes[macro]));
    pieData.push({ x: 1, y: value, label: macro });
  }
  return (
    <>
      <ScrollView>
        <MacroCalendar
          date={state.date}
          monthData={monthData}
          onMonthChange={(date) => {
            loadMonthData(date.year, date.month - 1, loadMonthData);
            loadAggregatedData(date.year, date.month - 1, setSummaryData);
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 20 }}>Ingestas</Text>
          <VictoryPie
            cornerRadius={5}
            padAngle={2}
            style={{ padding: 10 }}
            width={width - 10}
            height={300}
            innerRadius={2}
            colorScale={pieColors}
            data={pieData}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: -60,
          }}
        >
          {colorLegend("yellow", "Por debajo")}
          {colorLegend("green", "Justo")}
          {colorLegend("red", "Por encima")}
          <View style={{ height: 150 }} />
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 15 }}>
          Objetivo / Actual
        </Text>
        <PolarChart inputData={[maxTakes, takes]} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: -60,
          }}
        >
          {colorLegend("green", "Objetivo")}
          {colorLegend("blue", "Actual")}
          <View style={{ height: 150 }} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
