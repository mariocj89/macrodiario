import React from "react";
import { View, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const HelpScreen = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").heightt;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        width={width}
        height={height}
        data={[...new Array(6).keys()]}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({});

export default HelpScreen;
