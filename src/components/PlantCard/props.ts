import { RectButtonProps } from "react-native-gesture-handler";

export interface PlantCardProps extends RectButtonProps {
  name: string;
  photo: string;
  hour: string;
  handleRemovePlant: () => void;
}
