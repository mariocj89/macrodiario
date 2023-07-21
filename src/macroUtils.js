const macroColor = (takes, maxTakes) => {
  if (maxTakes === 0) {
    return null;
  }
  if (takes == maxTakes) {
    return "green";
  }
  if (takes > maxTakes) {
    return "red";
  }
  return "#ffea00";
};

const translations = {
  vegetables: "Verduras",
  proteins: "Proteinas",
  fats: "Grasas",
  carbs: "Carbohidratos",
  fruits: "Fruta",
};

const MacroUtils = {
  macroColor,
  translations,
};

export default MacroUtils;
