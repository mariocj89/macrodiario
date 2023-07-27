import React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
} from "victory-native";
import { View, Text } from "react-native";
import ColorLegend from "./ColorLegend";

const getMaxima = (data) => {
  var result = {};
  var highestValue = 0;
  for (item of data) {
    for (const [key, value] of Object.entries(item)) {
      highestValue = Math.max(highestValue, value);
    }
  }
  const keys = Object.keys(data[0]);
  for (key of keys) {
    result[key] = highestValue;
  }
  return result;
};

const processData = (data) => {
  const maxByGroup = getMaxima(data);
  const makeDataArray = (d) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
};
const MacroRadar = ({ takes, maxTakes }) => {
  const data = processData([maxTakes, takes]);
  const maxima = getMaxima([maxTakes, takes]);
  return (
    <View>
      <Text style={{ fontSize: 20, alignSelf: "center" }}>
        Objetivo / Actual
      </Text>
      <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
        <VictoryGroup
          colorScale={["green", "blue"]}
          style={{ data: { fillOpacity: 0.3, strokeWidth: 2 } }}
        >
          {data.map((data, i) => {
            return <VictoryArea key={i} data={data} />;
          })}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              dependentAxis
              style={{
                axisLabel: { padding: 10 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.5, opacity: 1 },
              }}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={key}
              tickFormat={(t) => Math.ceil(t * maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })}
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "grey", opacity: 0.5 },
          }}
        />
      </VictoryChart>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: -10,
        }}
      >
        <ColorLegend color="green" text="Objetivo" />
        <ColorLegend color="blue" text="Real" />
      </View>
    </View>
  );
};

export default MacroRadar;
