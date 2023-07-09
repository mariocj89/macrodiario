import { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Storage from "../storage";
import DateStr from "../dateStr";
import StateContext from "../context/stateProvider";

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

const CalendarScreen = ({ navigation }) => {
  const [state, manager] = useContext(StateContext);
  const [markedDays, setMarkedDays] = useState({});
  useEffect(() => {
    loadMonthData(
      new Date(state.date).getFullYear(),
      new Date(state.date).getMonth(),
      setMarkedDays,
    );
  }, []);
  return (
    <>
      <Calendar
        markingType="multi-dot"
        markedDates={markedDays}
        initialDate={state.date}
        hideExtraDays={true}
        theme={{ selectedDayBackgroundColor: "white" }}
        onDayPress={(date) => {
          const newDate = DateStr.dateToStr(new Date(date.dateString));
          manager.setDay(newDate);
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
