import React, { ReactElement } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import wartering from "../../assets/watering.png";

import { Styles } from "./styles";

export default function Welcome(): ReactElement {
  const navigaton = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={Styles.container}>
        <Text style={Styles.title}>
          Gerencie {"\n"} suas plantas de {"\n"} forma facil
        </Text>

        <Image source={wartering} style={Styles.image} resizeMode="contain" />

        <Text style={Styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <RectButton
          onPress={() => navigaton.navigate("UserIdentification")}
          style={Styles.button}
        >
          <Feather name="chevron-right" style={Styles.icon} />
        </RectButton>
      </View>
    </SafeAreaView>
  );
}
