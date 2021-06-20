import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { View, Text, Image, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { format, formatDistance } from "date-fns";
import AsyncStorage from "@react-native-community/async-storage";

import Header from "../../components/Header";
import PlantCard from "../../components/PlantCard";

import { Styles } from "./styles";

import { PlantProps } from "./props";
import { StoragePlantProps } from "../PlantSave/props";

import { pt } from "date-fns/locale";
import Loading from "../../components/Loading";

async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            "hh:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    throw new Error();
  }
}

async function removePlants(id: number): Promise<void> {
  const data = await AsyncStorage.getItem("@plantmanager:plants");
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  delete plants[id];

  await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
}

export default function MyPlants(): ReactElement {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextWatered, setNextWatered] = useState<string>("");

  useEffect(() => {
    async function loadStoragedPlants() {
      setLoading(true);
      const plantsStoraged = await loadPlants();

      if (plantsStoraged.length > 0) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt }
        );

        setNextWatered(
          `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`
        );
        setMyPlants(plantsStoraged);
      }

      setLoading(false);
    }

    loadStoragedPlants();
  }, []);

  const handleRemovePlant = useCallback(
    (plant: PlantProps) => {
      Alert.alert(`Remover`, `Deseja remover a ${plant.name} ?`, [
        { text: "não 🙏", style: "cancel" },
        {
          text: "Sim 😢",
          onPress: async () => {
            try {
              await removePlants(plant.id);

              setMyPlants((oldValueState) =>
                oldValueState.filter((item) => item.id !== plant.id)
              );
            } catch (error) {
              Alert.alert("Não foi possivel deletar a sua planta, desculpe");
            }
          },
        },
      ]);
    },
    [setMyPlants]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={Styles.container}>
      <Header />

      {myPlants.length > 0 && (
        <View style={Styles.spotlight}>
          <Image
            style={Styles.spotlightImage}
            source={require("../../assets/waterdrop.png")}
          />

          <Text style={Styles.spotlightText}>{nextWatered}</Text>
        </View>
      )}

      <View style={Styles.plants}>
        <Text style={Styles.plantsTitle}>Próximas regadas</Text>

        <View>
          {myPlants.length === 0 && (
            <Text style={Styles.notHavePlants}>
              Você nao tem plantas para regar
            </Text>
          )}
        </View>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlantCard
              hour={item.hour}
              name={item.name}
              photo={item.photo}
              handleRemovePlant={handleRemovePlant}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
