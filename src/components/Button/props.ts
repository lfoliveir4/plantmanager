import { BaseButtonProps } from "react-native-gesture-handler";

export interface ButtonProps extends BaseButtonProps {
  title: string;
  onPress: () => void;
}
