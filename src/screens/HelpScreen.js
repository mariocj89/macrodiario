import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Video, ResizeMode } from "expo-av";
import { useTranslation } from "react-i18next";

const HelpScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const carousel = React.useRef(null);
  const videoMethod = React.useRef(null);
  const videoGuide = React.useRef(null);

  const carouselProgressChange = (offsetProgress, absoluteProgress) => {
    if (absoluteProgress == 1) {
      videoMethod.current.playAsync();
    } else {
      videoMethod.current.pauseAsync();
    }
    if (absoluteProgress == 2) {
      videoGuide.current.playAsync();
    } else {
      videoGuide.current.pauseAsync();
    }
  };
  const nextButton = (text, onClick) => {
    const defaultNext = () => {
      carousel.current?.next();
    };
    return (
      <View>
        <Image
          source={require("../../assets/intro-heart.png")}
          style={{ position: "absolute", left: -120 }}
        />
        <Image
          source={require("../../assets/intro-heart.png")}
          style={{ position: "absolute", left: 120 }}
        />
        <TouchableOpacity
          style={style.nextButton}
          onPress={onClick ?? defaultNext}
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            {text ?? t("Siguiente")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={carousel}
        loop={false}
        width={width}
        height={height}
        onProgressChange={carouselProgressChange}
        data={[
          <View style={style.containerStyle}>
            <Image source={require("../../assets/intro-image.png")} />
            <Text style={{ fontSize: 25 }}>¡Bienvenido a Macro Diario!</Text>
            {nextButton(t("Empecemos"))}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Video
              ref={videoMethod}
              style={{
                width: 350,
                height: "70%",
                borderWidth: 10,
                borderRadius: 10,
              }}
              source={require("../../assets/metodo-mano.mp4")}
              useNativeControls
              resizeMode={ResizeMode.COVER}
            />
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Video
              ref={videoGuide}
              style={{
                width: 350,
                height: "70%",
                borderWidth: 10,
                borderRadius: 10,
              }}
              source={require("../../assets/app-guide.mp4")}
              useNativeControls
              resizeMode={ResizeMode.COVER}
            />
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 350, height: 350 }}
              source={require("../../assets/info-intro.png")}
            />
            <View>
              <Text style={{ fontSize: 15 }}>
                Recuerda que el volumen de los alimentos es aproximado, no te
                vuelvas loco con los detalles.
              </Text>
              <Text></Text>
              <Text>
                Para más informacion, visita esta guía sobre el método de la
                mano:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  alignSelf: "center",
                  color: "blue",
                  paddingTop: 5,
                }}
                onPress={() =>
                  Linking.openURL(
                    "https://carloscasadocoach.com/como-ajustar-calorias-sin-estar-a-dieta/"
                  )
                }
              >
                Cómo ajustar calorías sin estar a dieta
              </Text>
            </View>
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../../assets/ready.png")}
            />
            <Text style={{ fontSize: 15 }}>
              ¡Todo listo, empezemos a trabajar para conseguir hábitos
              saludables!
            </Text>
            {nextButton(t("¡Listo!"), () => {
              navigation.replace("DayInput");
            })}
          </View>,
        ]}
        renderItem={({ item }) => item}
      />
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#65dc83",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  nextButton: {
    backgroundColor: "#003a00",
    padding: 25,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
});

export default HelpScreen;
