import React, { ReactElement, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore, format } from "date-fns";
import { SvgFromUri } from "react-native-svg";

import Button from "../../components/Button";

import { Styles } from "./styles";

import { StoragePlantProps, PlantProps } from "./props";

export interface Params {
  plant: PlantProps;
}

async function savePlants(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = { [plant.id]: { data: plant } };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({ ...newPlant, ...oldPlants })
    );
  } catch (error) {
    throw new Error();
  }
}

export default function PlantSave({}): ReactElement {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [showDatePickerFromPlatform, setShowDatePickerFromPlatform] = useState(
    Platform.OS === "ios"
  );

  const { plant } = route.params as Params;

  const handleChangeTime = useCallback(
    (event: Event, dateTime: Date | undefined) => {
      if (!showDatePickerFromPlatform) {
        setShowDatePickerFromPlatform((oldStateValue) => !oldStateValue);
      }

      if (dateTime && isBefore(dateTime, new Date())) {
        setSelectedDateTime(new Date());
        return Alert.alert("você não pode escolher uma data no passado! 😞");
      }

      if (dateTime) {
        setSelectedDateTime(dateTime);
      }
    },
    [showDatePickerFromPlatform, selectedDateTime]
  );

  const handleOpenDateTimePickerForAndroid = useCallback(
    () => setShowDatePickerFromPlatform((oldStateValue) => !oldStateValue),
    [setShowDatePickerFromPlatform]
  );

  const handleSavePlant = useCallback(async () => {
    await savePlants({ ...plant, dateTimeNotification: selectedDateTime });

    navigation.navigate("Confirmation", {
      title: "Tudo Certo",
      subtitle:
        "Fique tranquilo que vamos sempre lembrar de você cuidar da sua plantinha com cuidados.",
      icon: "hug",
      buttonTitle: "Muito obrigado",
      nextScreen: "MyPlants",
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <View style={Styles.content}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={Styles.plantName}>{plant.name}</Text>

          <Text style={Styles.plantAbout}>{plant.about}</Text>
        </View>

        <View style={Styles.controller}>
          <View style={Styles.tipContainer}>
            <Image
              source={require("../../assets/waterdrop.png")}
              style={Styles.tipImage}
            />
            <Text style={Styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={Styles.alertLabel}>
            Escolha o melhor horario para ser lembrado
          </Text>

          {showDatePickerFromPlatform && (
            <DateTimePicker
              style={{ width: "100%", backgroundColor: "white" }}
              value={selectedDateTime}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              style={Styles.dateTimePickerContainer}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={Styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, `HH:mm`)}`}Mudar horario
              </Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSavePlant} />
        </View>
      </View>
    </ScrollView>
  );
}
