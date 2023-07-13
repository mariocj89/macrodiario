import DateStr from "../dateStr";
import { useState, useEffect } from "react";
import Storage from "../storage";

const loadDayData = async (day) => {
  const maxTakes = await Storage.getMaxTakes(day);
  const takes = await Storage.getDayTakesOrDefault(day);
  return {
    takes: takes,
    maxTakes: maxTakes,
  };
};


const useDayState = () => {
  const [state, setState] = useState({ date: DateStr.today(), dayData: null });
  const stateManager = {
    setDay: async (date) => {
      await Storage.isFirstTimeStartup();  // TODO: Move this to home screen.
      await Storage.ensureMaxTakes(date);
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
  useEffect(() => {
    stateManager.setDay(DateStr.today())
  }, []);
  return [state, stateManager];
};

export default useDayState;
