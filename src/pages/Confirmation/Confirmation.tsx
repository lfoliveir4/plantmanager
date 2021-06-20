import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Button from "../../components/Button";

import { Styles } from "./styles";

import { ConfirmationProps } from "./props";

const emojis = { hug: "🤗", smile: "😄" };

export default function Confirmation(): ReactElement {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    subtitle,
    nextScreen,
    icon,
    buttonTitle,
  } = route.params as ConfirmationProps;

  return (
    <View style={Styles.container}>
      <View style={Styles.contentContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={Styles.textEmoji}>{emojis[icon]}</Text>

          <Text style={Styles.title}>{title}</Text>

          <Text style={Styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={{ padding: 20 }}>
          <Button
            onPress={() => navigation.navigate(nextScreen)}
            title={buttonTitle}
          />
        </View>
      </View>
    </View>
  );
}
