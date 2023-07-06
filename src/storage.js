import AsyncStorage from "@react-native-async-storage/async-storage";

const dateToKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
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
  const day = dateToKey(date);
  save(`takes-${day}`, takes);
};

const getDayTakes = async (date) => {
  const day = dateToKey(date);
  return get(`takes-${day}`);
};

const getMaxTakes = async (date) => {
  const day = dateToKey(date);
  const maxTakes = await get(`maxTakes-${day}`);
  if (maxTakes !== null) {
    return maxTakes;
  }
  return get("maxTakes");
};

const saveMaxTakes = async (date, maxTakes) => {
  const day = dateToKey(date);
  save("maxTakes", maxTakes); // for all future configs
  save(`maxTakes-${day}`, maxTakes);
};

const Storage = {
  saveDayTakes: saveDayTakes,
  getDayTakes: getDayTakes,
  getMaxTakes: getMaxTakes,
  saveMaxTakes: saveMaxTakes,
};

export default Storage;
