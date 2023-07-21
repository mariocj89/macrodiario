import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { VictoryPie } from "victory-native";
import ColorLegend from "./ColorLegend";
import MacroUtils from "../macroUtils";

const MacroPie = ({ takes, maxTakes }) => {
  const width = Dimensions.get("window").width;
  var pieData = [];
  var pieColors = [];
  for (const [macro, value] of Object.entries(takes)) {
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
      <Text style={{ fontSize: 20 }}>Ingestas</Text>
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
        <ColorLegend color="yellow" text="Por debajo" />
        <ColorLegend color="green" text="Justo" />
        <ColorLegend color="red" text="Por encima" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MacroPie;
