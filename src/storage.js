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
    result[DateStr.dateToStr(date)] = { maxTakes, takes };
  }
  return result;
};

const isFirstTimeStartup = async () => {
  const startupSentinel = await get("startup-sentinel");
  if (startupSentinel >= 1) {
    return false;
  }
  console.info("Initial load of the app");
  await save("startup-sentinel", 1);
  return true;
};

const Storage = {
  saveDayTakes: saveDayTakes,
  getDayTakesOrDefault: getDayTakesOrDefault,
  saveMaxTakes: saveMaxTakes,
  getMaxTakes: getMaxTakes,
  getMonthData: getMonthData,
  ensureMaxTakes: ensureMaxTakes,
  isFirstTimeStartup: isFirstTimeStartup,
};

export default Storage;
