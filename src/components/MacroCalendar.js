import React from "react";
import {
  Calendar,
  LocaleConfig,
  WeekCalendar,
  CalendarProvider,
} from "react-native-calendars";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import MacroUtils from "../macroUtils";
import CalendarMacroDay from "./CalendarMacroDay";
import { Text, View } from "react-native";
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

const orangeIcons = new Set(["burger", "alcohol"]);
const uncoloredIcons = new Set(["cheat"]);

const makeColors = (dayData) => {
  const dayColors = {};
  const { takes, maxTakes, objectives } = dayData;
  if (takes !== null && maxTakes !== null) {
    for (const [macro, value] of Object.entries(takes)) {
      if (maxTakes[macro] === 0) {
        continue;
      }
      dayColors[macro] = MacroUtils.macroColor(value, maxTakes[macro]);
    }
  }
  if (objectives !== null) {
    for (const [objective, value] of Object.entries(objectives ?? {})) {
      if (value) {
        if (uncoloredIcons.has(objective)) {
          dayColors[objective] = null;
        } else if (orangeIcons.has(objective)) {
          dayColors[objective] = "orange";
        } else {
          dayColors[objective] = "blue";
        }
      }
    }
  }
  return dayColors;
};

const MonthMacroCalendar = ({ date, monthData, onMonthChange, onDayPress }) => {
  const calendarDayData = {};
  for (const [date, dayData] of Object.entries(monthData)) {
    calendarDayData[date] = makeColors(dayData);
  }
  return (
    <Calendar
      enableSwipeMonths
      initialDate={date}
      hideExtraDays={true}
      pastScrollRange={0}
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

const WeekMacroCalendar = ({ date, weekData, onWeekChange, onDayPress }) => {
  const calendarDayData = {};
  for (const [date, dayData] of Object.entries(weekData)) {
    calendarDayData[date] = makeColors(dayData);
  }
  const calendarDayComponent = ({ date }) => {
    return (
      <CalendarMacroDay
        date={date}
        dayData={calendarDayData[date.dateString]}
        onDayPress={onDayPress}
      />
    );
  };
  return (
    <CalendarProvider date={date} >
      <WeekCalendar
        firstDay={1}
        dayComponent={calendarDayComponent}
        scrollEnabled={false}
        staticHeader={true}
      />
    </CalendarProvider>
  );
};

const MacroCalendar = {
  MonthMacroCalendar,
  WeekMacroCalendar,
};

export default MacroCalendar;
