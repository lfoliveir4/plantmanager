import React, { ReactElement } from "react";
import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { EnviromentButtonProps } from "./props";

import { Styles } from "./styles";

export default function EnviromentButton({
  title,
  onPress,
  active = false,
  ...rest
}: EnviromentButtonProps): ReactElement {
  return (
    <RectButton
      onPress={onPress}
      style={[Styles.button, active && Styles.buttonActive]}
      {...rest}
    >
      <Text style={[Styles.textButton, active && Styles.textButtonActive]}>
        {title}
      </Text>
    </RectButton>
  );
}
