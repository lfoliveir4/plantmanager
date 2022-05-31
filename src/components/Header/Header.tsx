import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactElement, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { HeaderProps } from "./props";

import { Styles } from "./styles";

export default function Header({}: HeaderProps): ReactElement {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function loadStoragedUser() {
      const user = await AsyncStorage.getItem("@plantmanager:user");

      setName(user || "");
    }

    loadStoragedUser();
  }, []);

  return (
    <View style={Styles.container}>
      <View>
        <Text style={Styles.title}>Olá,</Text>
        <Text style={Styles.titleName}>{name}</Text>
      </View>

      <Image
        style={Styles.image}
        source={{ uri: "https://lfoliveira.technology/images/profile.jpg" }}
      />
    </View>
  );
}
