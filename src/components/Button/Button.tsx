import React, { ReactElement } from "react";
import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { ButtonProps } from "./props";

import { Styles } from "./styles";

export default function Button({ title, onPress }: ButtonProps): ReactElement {
  return (
    <RectButton onPress={onPress} style={Styles.button}>
      <Text style={Styles.textButton}>{title}</Text>
    </RectButton>
  );
}
