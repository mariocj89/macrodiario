import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { StyleSheet } from "react-native";

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

const dotColor = (takes, maxTakes) => {
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
  const dots = macros.map((macro) => dotColor(takes[macro], maxTakes[macro]));
  return {
    dots: dots
      .filter((n) => n)
      .map((color, idx) => {
        return { key: idx, color };
      }),
    disabled: false,
  };
};

const MacroCalendar = ({ date, monthData, onMonthChange, onDayPress }) => {
  const calendarDayData = {};
  for (const [date, dayData] of Object.entries(monthData)) {
    calendarDayData[date] = makeMarkedDay(dayData);
  }
  return (
    <Calendar
      markingType="multi-dot"
      markedDates={calendarDayData}
      initialDate={date}
      hideExtraDays={true}
      theme={{ selectedDayBackgroundColor: "white" }}
      onDayPress={onDayPress}
      onMonthChange={onMonthChange}
      disabledByDefault
      disableAllTouchEventsForDisabledDays
      enableSwipeMonths
    />
  );
};

const styles = StyleSheet.create({});

export default MacroCalendar;
