import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MacroUtils from "../macroUtils";
import CalendarMacroDay from "./CalendarMacroDay";

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

const makeColors = (dayData) => {
  const dayColors = {};
  const { takes, maxTakes, objectives } = dayData;
  if (takes !== null && maxTakes !== null) {
    for (const [macro, value] of Object.entries(takes)) {
      dayColors[macro] = MacroUtils.macroColor(value, maxTakes[macro]);
    }
  }
  if (objectives !== null) {
  for (const [objective, value] of Object.entries(objectives ?? {})) {
    if (value) {
      dayColors[objective] = "blue";
    }
  }
}
  return dayColors;
};

const MacroCalendar = ({ date, monthData, onMonthChange, onDayPress }) => {
  const calendarDayData = {};
  for (const [date, dayData] of Object.entries(monthData)) {
    calendarDayData[date] = makeColors(dayData);
  }
  return (
    <Calendar
      initialDate={date}
      hideExtraDays={true}
      firstDay={1}
      onMonthChange={onMonthChange}
      dayComponent={({ date }) => {
        return (
          <CalendarMacroDay
            date={date}
            dayData={calendarDayData[date.dateString]}
            onDayPress={onDayPress}
          />
        );
      }}
    />
  );
};

export default MacroCalendar;
