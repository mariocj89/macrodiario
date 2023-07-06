
const dateToStr = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = () => {
    return dateToStr(new Date())
}

const incDay = (inDate) => {
    const date = new Date(inDate);
    date.setDate(date.getDate() + 1)
    return dateToStr(date)
}

const decDay = (inDate) => {
    const date = new Date(inDate);
    date.setDate(date.getDate() -1)
    return dateToStr(date)
}


const DateStr = {
    today: today,
    incDay: incDay,
    decDay: decDay,
    dateToStr: dateToStr,
};

export default DateStr;
