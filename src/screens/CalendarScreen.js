import { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Storage from "../storage";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";
import PolarChart from "../components/PolarChart";
import { VictoryPie } from "victory-native";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

const loadMonthData = async (year, month, action) => {
  const monthData = await Storage.getMonthData(year, month);
  var result = {};
  for (const [date, dayData] of Object.entries(monthData)) {
    result[date] = makeMarkedDay(dayData);
  }
  action(result);
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
const makeMarkedDay = (dayData) => {
  const takes = dayData.takes;
  const maxTakes = dayData.maxTakes;
  const macros = ["vegetables", "proteins", "carbs", "fats", "fruits", "water"];
  const dots = macros.map((macro) => color(takes[macro], maxTakes[macro]));
  return {
    dots: dots
      .filter((n) => n)
      .map((color, idx) => {
        return { key: idx, color };
      }),
    disabled: false,
  };
};

const translation = {
  vegetables: "Verduras",
  proteins: "Proteinas",
  fats: "Grasas",
  carbs: "Carbohidratos",
  fruits: "Fruta",
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
  const width = Dimensions.get("window").width;
  const [state, manager] = useContext(StateContext);
  const [calendarDayData, setCalendarDayData] = useState({});
  const [[maxTakes, takes], setSummaryData] = useState([{}, {}]);
  useEffect(() => {
    loadMonthData(
      new Date(state.date).getFullYear(),
      new Date(state.date).getMonth(),
      setCalendarDayData
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
        <Calendar
          markingType="multi-dot"
          markedDates={calendarDayData}
          initialDate={state.date}
          hideExtraDays={true}
          theme={{ selectedDayBackgroundColor: "white" }}
          onDayPress={(date) => {
            const newDate = DateStr.dateToStr(new Date(date.dateString));
            manager.setDay(newDate);
            navigation.navigate("DayInput");
          }}
          onMonthChange={(date) => {
            loadMonthData(date.year, date.month - 1, setCalendarDayData);
            loadAggregatedData(date.year, date.month - 1, setSummaryData);
          }}
          disabledByDefault
          disableAllTouchEventsForDisabledDays
          enableSwipeMonths
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
