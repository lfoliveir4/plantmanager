import React, { ReactElement } from "react";
import { Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import { PlantButtonProps } from "./props";

import { Styles } from "./styles";

export default function PlantButton({
  name,
  photo,
  ...rest
}: PlantButtonProps): ReactElement {
  return (
    <RectButton style={Styles.button} {...rest}>
      <SvgFromUri uri={photo} width={70} height={70} />

      <Text style={Styles.textButton}>{name}</Text>
    </RectButton>
  );
}
