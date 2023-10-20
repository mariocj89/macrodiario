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
  vegetables: "Verduras",
  proteins: "Proteínas",
  fats: "Grasas",
  carbs: "Carbohidratos",
  fruits: "Fruta",
  dairy: "Lácteos",
};

const MacroUtils = {
  macroColor,
  translations,
};

export default MacroUtils;
