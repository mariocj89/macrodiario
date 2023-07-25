import { useState } from "react";
import Storage from "../storage";
import DateStr from "../dateStr";

const loadDayData = async (day) => {
  const maxTakes = await Storage.getMaxTakes(day);
  const takes = await Storage.getDayTakesOrDefault(day);
  const objectives = await Storage.getObjectivesOrDefault(day);
  const objectivesConfig = await Storage.getObjectivesConfig();
  return {
    takes,
    maxTakes,
    objectives,
    objectivesConfig,
  };
};

const loadWeekData = async (day) => {
  const res = {};
  const date = new Date(day);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // Monday
  console.log("Loading date for week starting on", DateStr.dateToStr(date));
  for (let i = 0; i < 7; i++) {
    const dateStr = DateStr.dateToStr(date);
    const objectives = await Storage.getObjectivesOrDefault(dateStr);
    for (const [objective, value] of Object.entries(objectives)) {
      if (value) {
        res[objective] = (res[objective] ?? 0) + 1;
      }
    }
    date.setDate(date.getDate() + 1);
  }
  return res;
};

const useDayState = () => {
  const [state, setState] = useState({
    date: null,
    dayData: null,
    weekData: null,
  });
  const validStateCheck = () => {
    if (state.date === null) {
      throw new Error("Tried to update data before setting a day");
    }
  };
  const stateManager = {
    setDay: async (date) => {
      await Storage.ensureMaxTakes(date);
      const dayData = await loadDayData(date);
      const weekData = await loadWeekData(date);
      console.log(
        "Updating day to",
        date,
        "with day data:",
        dayData,
        "week data:",
        weekData,
      );
      setState({ ...state, date, dayData, weekData });
    },
    setMaxTakes: (maxTakesDelta) => {
      validStateCheck();
      console.log("Updating", state.date, " maxTakes with", maxTakesDelta);
      const maxTakes = { ...state.dayData.maxTakes, ...maxTakesDelta };
      Storage.saveMaxTakes(state.date, maxTakes);
      setState({ ...state, dayData: { ...state.dayData, maxTakes: maxTakes } });
    },
    setTakes: (takesDelta) => {
      validStateCheck();
      console.log("Updating", state.date, " takes with", takesDelta);
      const takes = { ...state.dayData.takes, ...takesDelta };
      Storage.saveDayTakes(state.date, takes);
      setState({ ...state, dayData: { ...state.dayData, takes: takes } });
    },
    toggleObjective: (objective) => {
      validStateCheck();
      console.log("Updating", state.date, " objective ", objective);
      const pastValue = state.dayData.objectives[objective] ?? false;
      const objectives = {
        ...state.dayData.objectives,
        ...{ [objective]: !pastValue },
      };
      Storage.saveObjectives(state.date, objectives);
      setState({
        ...state,
        dayData: { ...state.dayData, objectives: objectives },
        weekData: {
          ...state.weekData,
          [objective]: (state.weekData[objective] ?? 0) + (pastValue ? -1 : 1),
        },
      });
    },
    setObjectiveConfig: (configDelta) => {
      validStateCheck();
      console.log(
        "Updating",
        state.date,
        " objectives config with",
        configDelta,
      );
      const config = { ...state.dayData.objectivesConfig, ...configDelta };
      Storage.saveObjectivesConfig(config);
      setState({
        ...state,
        dayData: { ...state.dayData, objectivesConfig: config },
      });
    },
  };
  return [state, stateManager];
};

export default useDayState;
