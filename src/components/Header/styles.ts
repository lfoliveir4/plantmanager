import { StyleSheet, Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "android" ? 20 : 0,
    marginTop: getStatusBarHeight(),
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  titleName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },

  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});
