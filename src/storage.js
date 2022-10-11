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
  return save(`takes-${day}`, takes)
};

const getDayTakes = async (date) => {
  const day = dateToKey(date);
  return get(`takes-${day}`)
};

const getMaxTakes = async () => {
  return get("maxTakes")
};

const saveMaxTakes = async (maxTakes) => {
  return save("maxTakes", maxTakes)
};

const Storage = {
  saveDayTakes: saveDayTakes,
  getDayTakes: getDayTakes,
  getMaxTakes: getMaxTakes,
  saveMaxTakes: saveMaxTakes,
};

export default Storage;
