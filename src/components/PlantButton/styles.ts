import { StyleSheet, Dimensions } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 7,
    paddingVertical: 25,
  },

  textButton: {
    fontSize: 16,
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
