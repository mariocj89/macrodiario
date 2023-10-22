import { useTranslation } from 'react-i18next';
import React from "react";
import {
  Calendar,
  LocaleConfig,
} from "react-native-calendars";
import Week from "react-native-calendars/src/expandableCalendar/week";
import MacroUtils from "../macroUtils";
import CalendarMacroDay from "./CalendarMacroDay";
import { TouchableOpacity, View, Image, Text } from "react-native";
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
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};

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
      dayComponent={CalendarMacroDay}
      onDayPress={onDayPress}
      markedDates={calendarDayData}
    />
  );
};

const addDays = (date, days) => {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const WeekMacroCalendar = ({ date, weekData, onWeekChange, onDayPress }) => {
  const { t } = useTranslation();
  const calendarDayData = {};
  for (const [date, dayData] of Object.entries(weekData)) {
    calendarDayData[date] = makeColors(dayData);
  }
  const weekNo = DateStr.getWeekNumber(date);
  var title = t("Semana ") +  weekNo.toString();
  if (weekNo == DateStr.getWeekNumber(DateStr.today())) {
    var title = t("Semana actual");
  }
  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => {
            onWeekChange(addDays(date, -7));
          }}
        >
          <Image
            source={require("../../assets/left-arrow.png")}
            style={{ tintColor: "#4ab5cf", width: 15, height: 15 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 15 }}>{title}</Text>
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => {
            onWeekChange(addDays(date, 7));
          }}
        >
          <Image
            source={require("../../assets/right-arrow.png")}
            style={{ tintColor: "#4ab5cf", width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </View>
      <Week
        allowShadow={false}
        current={date}
        markedDates={calendarDayData}
        style={{
          alignContent: "center",
        }}
        scrollViewProps={{ scrollEnabled: false }}
        firstDay={1}
        dayComponent={CalendarMacroDay}
        scrollEnabled={false}
        staticHeader={true}
        onDayPress={onDayPress}
      />
    </View>
  );
};

const MacroCalendar = {
  MonthMacroCalendar,
  WeekMacroCalendar,
};

export default MacroCalendar;
