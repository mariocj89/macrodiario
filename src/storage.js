import AsyncStorage from "@react-native-async-storage/async-storage";
import DateStr from "./dateStr";

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
  save(`takes/${date}`, takes);
};

const getDayTakes = async (date) => {
  return get(`takes/${date}`);
};

const getMaxTakes = async (date) => {
  const maxTakes = await get(`maxTakes/${date}`);
  if (maxTakes !== null) {
    return maxTakes;
  }
  const newMaxTakes = await get("maxTakes");
  saveMaxTakes(date, newMaxTakes);
  return newMaxTakes;
};

const saveMaxTakes = async (date, maxTakes) => {
  save("maxTakes", maxTakes); // for all future configs
  save(`maxTakes/${date}`, maxTakes);
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
    result[DateStr.dateToStr(date)] = { maxTakes, takes };
  }
  return result;
};

const Storage = {
  saveDayTakes: saveDayTakes,
  getDayTakes: getDayTakes,
  getMaxTakes: getMaxTakes,
  saveMaxTakes: saveMaxTakes,
  getMonthData: getMonthData,
};

export default Storage;
