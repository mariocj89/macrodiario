import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Storage from "../storage";
import DateStr from "../dateStr";

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
    console.log("Setting ", date, dayData);
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
  return "#e3df00";
};
const makeMarkedDay = (dayData) => {
  const takes = dayData.takes;
  const maxTakes = dayData.maxTakes;
  const dots = [
    color(takes.vegetables, maxTakes.vegetables),
    color(takes.proteins, maxTakes.proteins),
    color(takes.carbs, maxTakes.carbs),
    color(takes.fats, maxTakes.fats),
    color(takes.fruits, maxTakes.fruits),
  ];
  return {
    dots: dots
      .filter((n) => n)
      .map((color, idx) => {
        return { key: idx, color };
      }),
    disabled: false,
  };
};

const CalendarScreen = ({ navigation, route }) => {
  const { onDayChange } = route.params;
  const [markedDays, setMarkedDays] = useState({});
  useEffect(() => {
    loadMonthData(
      new Date().getFullYear(),
      new Date().getMonth(),
      setMarkedDays
    );
  }, []);
  return (
    <>
      <Calendar
        markingType="multi-dot"
        markedDates={markedDays}
        onDayPress={(date) => {
          onDayChange(DateStr.dateToStr(new Date(date.dateString)));
          navigation.navigate("DayInput");
        }}
        onMonthChange={(date) => {
          setMarkedDays({});
          loadMonthData(date.year, date.month - 1, setMarkedDays);
        }}
        disabledByDefault
        disableAllTouchEventsForDisabledDays
        enableSwipeMonths
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
