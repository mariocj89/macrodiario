import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { VictoryPie } from "victory-native";
import ColorLegend from "./ColorLegend";
import MacroUtils from "../macroUtils";
import { useTranslation } from "react-i18next";

const MacroPie = ({ takes, maxTakes }) => {
  const { t } = useTranslation();
  const width = Dimensions.get("window").width;
  var pieData = [];
  var pieColors = [];
  for (const [macro, value] of Object.entries(takes)) {
    if (value === 0) {
      continue;
    }
    pieColors.push(MacroUtils.macroColor(value, maxTakes[macro]));
    pieData.push({ x: 1, y: value, label: macro });
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <Text style={{ fontSize: 20 }}>{t("Ingestas")}</Text>
      <VictoryPie
        cornerRadius={5}
        padAngle={2}
        style={{ padding: 10 }}
        width={width - 10}
        height={300}
        innerRadius={2}
        colorScale={pieColors}
        data={pieData}
      />
      <View
        style={{
          width: width,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <ColorLegend color="#cccc00" text={t("Por debajo")} />
        <ColorLegend color="green" text={t("Justo")} />
        <ColorLegend color="red" text={t("Por encima")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MacroPie;
