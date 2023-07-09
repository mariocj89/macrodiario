import DateStr from "../dateStr";
import { useState, useEffect } from "react";
import Storage from "../storage";

DEFAULT_TAKES = {
  vegetables: 0,
  proteins: 0,
  carbs: 0,
  fats: 0,
  fruits: 0,
  water: 0,
};
DEFAULT_MAX_TAKES = {
  vegetables: 7,
  proteins: 6,
  carbs: 5,
  fats: 3,
  fruits: 0,
  water: 0,
};
const defaultState = {
  date: DateStr.today(),
  dayData: {
    takes: DEFAULT_TAKES,
    maxTakes: DEFAULT_MAX_TAKES,
  },
};
const loadDayData = async (day) => {
  const maxTakes = await Storage.getMaxTakes(day);
  const takes = await Storage.getDayTakes(day);
  return {
    takes: { ...DEFAULT_TAKES, ...takes },
    maxTakes: { ...DEFAULT_MAX_TAKES, ...maxTakes },
  };
};
const useDayState = () => {
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    loadDayData(state.date).then((dayData) => {
      console.log("Initial day load for ", state.date, " with", dayData);
      setState({ ...state, dayData });
    });
  }, []);
  const stateManager = {
    setDay: async (date) => {
      const dayData = await loadDayData(date);
      console.log("Updating day to", date, "with data:", dayData);
      setState({ ...state, date, dayData });
    },
    setMaxTakes: (maxTakesDelta) => {
      console.log("Updating", state.date, " maxTakes with", maxTakesDelta);
      const maxTakes = { ...state.dayData.maxTakes, ...maxTakesDelta };
      Storage.saveMaxTakes(state.date, maxTakes);
      setState({ ...state, dayData: { ...state.dayData, maxTakes: maxTakes } });
    },
    setTakes: (takesDelta) => {
      console.log("Updating", state.date, " takes with", takesDelta);
      const takes = { ...state.dayData.takes, ...takesDelta };
      Storage.saveDayTakes(state.date, takes);
      setState({ ...state, dayData: { ...state.dayData, takes: takes } });
    },
  };
  return [state, stateManager];
};

export default useDayState;
