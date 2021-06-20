import React, {
  ReactElement,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import EnviromentButton from "../../components/EnviromentButton";
import PlantButton from "../../components/PlantButton";
import Loading from "../../components/Loading";

import api from "../../services/api";

import { Styles } from "./styles";

import { PlantsEnvironmentsProps, PlantsProps } from "./props";
import colors from "../../styles/colors";

export default function Home(): ReactElement {
  const { navigate } = useNavigation();
  const [environments, setEnvironments] = useState<PlantsEnvironmentsProps[]>(
    []
  );
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchEnvironments() {
      api
        .get<PlantsEnvironmentsProps[]>(
          "plants_environments?_sort=title&_order=asc"
        )
        .then((response) => {
          setEnvironments([{ key: "all", title: "Todos" }, ...response.data]);
        });
    }

    fetchEnvironments();
  }, []);

  useEffect(() => {
    api
      .get<PlantsProps[]>(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
      .then((response) => {
        if (!response.data) {
          setLoading(false);
        }

        if (page > 1) {
          setPlants((oldStateValue) => [...oldStateValue, ...response.data]);
        } else {
          setPlants(response.data);
        }

        setLoading(false);
        setLoadingMore(false);
      });
  }, [page]);

  const handlePlantSelect = useCallback(
    (plant: PlantsProps) => {
      navigate("PlantSave", { plant });
    },
    [navigate]
  );

  const handleEnvironment = useCallback((environment: string) => {
    setEnvironmentSelected(environment);
  }, []);

  const handleFetchMore = useCallback((distance: number) => {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage((oldStateValue) => oldStateValue + 1);
  }, []);

  const filteredPlants = useMemo(() => {
    if (environmentSelected === "all") {
      return plants;
    }

    return plants.filter((plant) =>
      plant.environments.includes(environmentSelected)
    );
  }, [environmentSelected, plants]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={Styles.container}>
      <Header />
      <View style={Styles.header}>
        <Text style={Styles.title}>Em qual ambiente</Text>
        <Text style={Styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View style={Styles.containerList}>
        <FlatList
          data={environments}
          renderItem={({ item: environment }) => (
            <EnviromentButton
              active={environmentSelected === environment.key}
              onPress={() => handleEnvironment(environment.key)}
              title={environment.title}
            />
          )}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 20 }}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(plant) => String(plant.name)}
          renderItem={({ item }) => (
            <PlantButton
              name={item.name}
              photo={item.photo}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <SafeAreaView />
    </View>
  );
}
