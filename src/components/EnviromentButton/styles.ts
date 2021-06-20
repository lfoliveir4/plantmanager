import { StyleSheet, Dimensions } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Styles = StyleSheet.create({
  button: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  buttonActive: {
    backgroundColor: colors.green_light,
    height: 40,
    width: 76,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  textButton: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  textButtonActive: {
    color: colors.green_dark,
    fontFamily: fonts.text,
  },
});
