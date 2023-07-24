import AsyncStorage from "@react-native-async-storage/async-storage";
import DateStr from "./dateStr";

// Default objects that allows us to add new properties if necessary
// in the future.
DEFAULT_TAKES = {
  vegetables: 0,
  proteins: 0,
  carbs: 0,
  fats: 0,
  fruits: 0,
  water: 0,
};
DEFAULT_MAX_TAKES = {
  vegetables: 0,
  proteins: 0,
  carbs: 0,
  fats: 0,
  fruits: 0,
  water: 0,
};
DEFAULT_OBJ_CONFIG = {
  cardio: 0,
  strength: 0,
  meditation: 0,
};
DEFAULT_OBJ = {
  cardio: false,
  strength: false,
  meditate: false,
};

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save data. key=${key} value=${value}`);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error(`Failed to load data. key=${key}`);
  }
};

const saveDayTakes = async (date, takes) => {
  await save(`takes/${date}`, takes);
};

const getDayTakes = async (date) => {
  const dayTakes = await get(`takes/${date}`);
  if (dayTakes == null) {
    return null;
  }
  return { ...DEFAULT_TAKES, ...dayTakes };
};

const getDayTakesOrDefault = async (date) => {
  const takes = await getDayTakes(date);
  return takes ?? DEFAULT_TAKES;
};

const getMaxTakes = async (date) => {
  const maxTakes = await get(`maxTakes/${date}`);
  if (maxTakes === null) {
    return null;
  }
  return { ...DEFAULT_MAX_TAKES, ...maxTakes };
};

const getDefaultMaxTakes = async () => {
  const maxTakes = await get("maxTakes");
  return maxTakes ?? DEFAULT_MAX_TAKES;
};

const saveMaxTakes = async (date, maxTakes) => {
  await save("maxTakes", maxTakes); // for all future configs
  await save(`maxTakes/${date}`, maxTakes);
};

// If unset, sets the maxTakes for a day according to
// the configured global Max Takes
const ensureMaxTakes = async (date) => {
  const dayMaxTakes = await getMaxTakes(date);
  if (dayMaxTakes !== null) {
    return;
  }
  console.log("Setting maxTakes from default for", date);
  const defaultMaxTakes = await getDefaultMaxTakes();
  await saveMaxTakes(date, defaultMaxTakes);
};

const getObjectivesConfig = async () => {
  const config = await get("objectivesConfig");
  return config ?? DEFAULT_OBJ_CONFIG;
};

const saveObjectivesConfig = async (objectivesConfig) => {
  await save("objectivesConfig", objectivesConfig);
};

const saveObjectives = async (date, objectives) => {
  await save(`objectives/${date}`, objectives);
};

const getObjectives = async (date) => {
  const objectives = await get(`objectives/${date}`);
  if (objectives == null) {
    return null;
  }
  return { ...DEFAULT_OBJ, ...objectives };
};
const getObjectivesOrDefault = async (date) => {
  const obj = await getObjectives(date);
  return obj ?? DEFAULT_OBJ;
};

const getMonthData = async (year, month) => {
  const result = {};
  for (let day = 1; day < 32; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) {
      continue;
    }
    const takes = await getDayTakes(DateStr.dateToStr(date));
    if (takes === null) {
      continue;
    }
    const maxTakes = await getMaxTakes(DateStr.dateToStr(date));
    if (maxTakes === null) {
      // This should never happen
      console.error(
        DateStr.dateToStr(date),
        "has takes but not maxTakes set, ignoring"
      );
      continue;
    }
    const objectives = await getObjectives(DateStr.dateToStr(date));
    result[DateStr.dateToStr(date)] = { maxTakes, takes, objectives };
  }
  return result;
};

const isFirstTimeStartup = async () => {
  const startupSentinel = await get("startup-sentinel");
  await save("startup-sentinel", 2);
  if (startupSentinel < 2) {
    saveObjectivesConfig(DEFAULT_OBJ_CONFIG);
  }
  if (startupSentinel >= 1) {
    return false;
  }
  console.info("Initial load of the app");
  return true;
};

const deleteAllData = async () => {
  await AsyncStorage.clear();
};

const Storage = {
  saveDayTakes,
  getDayTakesOrDefault,
  saveMaxTakes,
  getMaxTakes,
  getMonthData,
  ensureMaxTakes,
  isFirstTimeStartup,
  deleteAllData,
  getObjectivesOrDefault,
  saveObjectives,
  getObjectivesConfig,
  saveObjectivesConfig,
};

export default Storage;
