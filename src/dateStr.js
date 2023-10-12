const dateToStr = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = () => {
  return dateToStr(new Date());
};

const incDay = (inDate) => {
  const date = new Date(inDate);
  date.setDate(date.getDate() + 1);
  return dateToStr(date);
};

const decDay = (inDate) => {
  const date = new Date(inDate);
  date.setDate(date.getDate() - 1);
  return dateToStr(date);
};

const humanize = (date) => {
  const isToday = date == today();
  if (isToday) {
    return "Hoy";
  } else if (date === DateStr.decDay(today())) {
    return "Ayer";
  }
  var jsDate = new Date(date);
  const day = jsDate.toLocaleDateString("es-ES", { day: "numeric" });
  const month = jsDate.toLocaleDateString("es-ES", { month: "short" });
  return `${day} / ${month[0].toUpperCase() + month.slice(1)}`;
};

const getWeekNumber = (date) => {
    var d = new Date(date);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
};

const DateStr = {
  today,
  incDay,
  decDay,
  dateToStr,
  humanize,
  getWeekNumber,
};

export default DateStr;
