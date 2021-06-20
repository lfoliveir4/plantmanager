import { StyleSheet, Dimensions } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 70,
  },

  textButton: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});
