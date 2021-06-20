import { RectButtonProps } from "react-native-gesture-handler";

export interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
  active?: boolean;
}
