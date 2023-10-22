import i18n from "../i18n";

const macroColor = (takes, maxTakes) => {
  const validDeviation = 0.15;
  if (maxTakes === 0) {
    return null;
  }
  if (takes === 0) {
    return "#cccc00";
  }
  const deviation = Math.abs(1 - Math.abs(maxTakes / takes));
  if (deviation < validDeviation) {
    return "green";
  }
  if (takes > maxTakes) {
    return "red";
  }
  return "#cccc00";
};

const translations = {
  vegetables: i18n.t("Verduras"),
  proteins: i18n.t("Proteínas"),
  fats: i18n.t("Grasas"),
  carbs: i18n.t("Carbohidratos"),
  fruits: i18n.t("Fruta"),
  dairy: i18n.t("Lácteos"),
};

const MacroUtils = {
  macroColor,
  translations,
};

export default MacroUtils;
