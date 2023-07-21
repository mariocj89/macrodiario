import React from "react";
import { Text, View } from "react-native";

const ColorLegend = ({ color, text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 25,
          height: 25,
          borderWidth: 1,
          marginRight: 10,
          backgroundColor: color,
        }}
      />
      <Text>{text}</Text>
    </View>
  );
};

export default ColorLegend;
