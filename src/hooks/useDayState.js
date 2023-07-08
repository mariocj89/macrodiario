import DateStr from "../dateStr";
import { useReducer } from "react";
import Storage from "../storage";

const reducer = (state, action) => {
  console.log("Action: ", action, state);
  const date = state.date;
  var takes = state.dayData ? { ...state.dayData.takes } : null;
  var maxTakes = state.dayData ? { ...state.dayData.maxTakes } : null;
  switch (action.type) {
    case "take":
      takes[action.payload] += 1;
      Storage.saveDayTakes(date, takes);
      return { ...state, dayData: { takes: takes, maxTakes: maxTakes } };
    case "untake":
      takes[action.payload] -= 1;
      Storage.saveDayTakes(date, takes);
      return { ...state, dayData: { takes: takes, maxTakes: maxTakes } };
    case "load_day_data":
      return { ...state, dayData: action.payload };
    case "set_max_takes":
      maxTakes = { ...maxTakes, ...action.payload };
      Storage.saveMaxTakes(date, maxTakes);
      return { ...state, dayData: { takes: takes, maxTakes: maxTakes } };
    case "set_day":
      return { ...state, date: action.payload, dayData: null };
    default:
      console.warn("Unexpected action: ", action);
      return state;
  }
};
const defaultState = {
  date: DateStr.today(),
  dayData: null,
};
const useDayState = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return [state, dispatch];
};


export default useDayState;