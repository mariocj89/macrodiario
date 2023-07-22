import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { StyleSheet } from "react-native";
import MacroUtils from "../macroUtils";

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

const makeMarkedDay = (dayData) => {
  const takes = dayData.takes;
  const maxTakes = dayData.maxTakes;
  const macros = ["vegetables", "proteins", "carbs", "fats", "fruits", "water"];
  const dots = macros.map((macro) =>
    MacroUtils.macroColor(takes[macro], maxTakes[macro]),
  );
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
      firstDay={1}
      onMonthChange={onMonthChange}
      disabledByDefault
      disableAllTouchEventsForDisabledDays
      enableSwipeMonths
    />
  );
};

const styles = StyleSheet.create({});

export default MacroCalendar;
