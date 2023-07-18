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

const HelpScreen = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const ref = React.useRef(null);

  const nextButton = (text, onClick) => {
    const defaultNext = () => {
      ref.current?.next();
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
            {text ?? "Siguiente"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        loop={false}
        width={width}
        height={height}
        data={[
          <View style={style.containerStyle}>
            <Image source={require("../../assets/intro-image.png")} />
            <Text style={{ fontSize: 25 }}>¡Bienvenido a Macro Diario!</Text>
            {nextButton("Empecemos")}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 350, height: 350 }}
              source={require("../../assets/info-intro.png")}
            />
            <Text style={{ fontSize: 15 }}>
              El método de la mano es la forma mas sencilla y eficaz para comer
              variado, sano y sin preocuparte por las calorías.
            </Text>
            <Text style={{ fontSize: 15 }}>
              En este metodo contamos de forma aproximada las raciones de macro
              alimentos que ingerimos al día.
            </Text>
            <Text style={{ fontSize: 15 }}>
              No se trata de tener que coger la comida con la propia mano antes
              de cocinarla o ponerla en el plato, si no de tener una medida
              estándar que nos permita controlar la cantidad de comida a ojo.
            </Text>
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 350, height: 350 }}
              source={require("../../assets/info-fist.png")}
            />
            <Text style={{ fontSize: 15 }}>
              El tamaño de tu puño cerrado determina 1 ración de vegetales.
            </Text>
            <Text style={{ fontSize: 15 }}>
              Cualquier verdura, hortaliza o fruta.
            </Text>
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 350, height: 350 }}
              source={require("../../assets/info-protein.png")}
            />
            <Text style={{ fontSize: 15 }}>
              Tu palma de la mano (en anchura y grosor) constituye 1 ración de
              proteína.
            </Text>
            <Text style={{ fontSize: 15 }}>
              Carne, pescado, huevos, marisco, legumbres, tofu, proteina de
              suero.
            </Text>
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 350, height: 350 }}
              source={require("../../assets/info-carbs.png")}
            />
            <Text style={{ fontSize: 15 }}>
              La garra, o tu mano en forma de cuenco representa 1 ración de
              carbohidrato.
            </Text>
            <Text style={{ fontSize: 15 }}>
              Patata, Boniato, arroz, quinoa, legumbres, cereales.
            </Text>
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Image
              style={{ width: 350, height: 350 }}
              source={require("../../assets/info-fats.png")}
            />
            <Text style={{ fontSize: 15 }}>
              Tu pulgar representa 1 ración de grasas.
            </Text>
            <Text style={{ fontSize: 15 }}>
              Aceite de oliva, aguacate, aceitunas, aceite de coco, mantequilla,
              cacao, frutos secos.
            </Text>
            {nextButton()}
          </View>,
          <View style={{ ...style.containerStyle }}>
            <Text style={{ fontSize: 150 }}>🔎</Text>
            <Text style={{ fontSize: 15 }}>
              ¡Recuerda no perderte en los detalles! Lo importante no es ser
              exacto, céntrate en ser constante.
            </Text>
            <View>
              <Text style={{ fontSize: 15 }}>
                Si aun así quieres más detalles, visita esta guía sobre el
                metodo de la mano:
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
            <Text style={{ fontSize: 150 }}>🎉</Text>
            <Text style={{ fontSize: 15 }}>
              ¡Todo listo, empezemos a trabajar para conseguir el cuerpo que
              quieres!
            </Text>
            {nextButton("¡Listo!", () => {
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
