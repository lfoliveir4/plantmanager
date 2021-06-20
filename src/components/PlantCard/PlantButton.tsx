import { Feather } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { Text, View, Animated } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import colors from "../../styles/colors";

import { PlantCardProps } from "./props";

import { Styles } from "./styles";

export default function PlantCard({
  name,
  photo,
  hour,
  handleRemovePlant,
  ...rest
}: PlantCardProps): ReactElement {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <RectButton style={Styles.buttonRemove} onPress={handleRemovePlant}>
            <Feather name="trash" size={32} color={colors.white} />
          </RectButton>
        </Animated.View>
      )}
    >
      <RectButton style={Styles.button} {...rest}>
        <SvgFromUri uri={photo} width={50} height={50} />

        <Text style={Styles.titleCard}>{name}</Text>

        <View style={Styles.details}>
          <Text style={Styles.time}>Regar as</Text>
          <Text style={Styles.timeLabel}>{hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}
