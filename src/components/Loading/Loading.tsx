import React, { ReactElement } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import { LoadingProps } from "./props";

import animation from "../../assets/load.json";

import { Styles } from "./styles";

export default function Loading({}: LoadingProps): ReactElement {
  return (
    <View style={Styles.container}>
      <LottieView source={animation} autoPlay />
    </View>
  );
}
