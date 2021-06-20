import React, { ReactElement, useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import Button from "../../components/Button";

import { Styles } from "./styles";
import colors from "../../styles/colors";

export default function UserIdentification(): ReactElement {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const navigation = useNavigation();

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!name);
  }, [isFocused, isFilled]);

  const handleInputFocus = useCallback(() => setIsFocused(true), [isFocused]);

  const handleInputChange = useCallback(
    (value: string) => {
      setIsFilled(!!value);
      setName(value);
    },
    [isFilled, name]
  );

  const handleSubmit = useCallback(async () => {
    if (!name) {
      return Alert.alert(`Me diz como chamar você 🥲`);
    }

    await AsyncStorage.setItem("@plantmanager:user", name);

    navigation.navigate("Confirmation", {
      title: "Prontinho",
      subtitle: "Agora vamos cuidar das suas plantinhas com muito cuidado",
      icon: "smile",
      buttonTitle: "Começar",
      nextScreen: "Home",
    });
  }, [name, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={Styles.container}>
          <View style={Styles.formContainer}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={Styles.textEmoji}> {isFilled ? "😃" : "🙂"} </Text>

              <Text style={Styles.title}>Como podemos {"\n"} chamar você?</Text>
            </View>

            <TextInput
              style={[
                Styles.input,
                (isFocused || isFilled) && { borderColor: colors.green },
              ]}
              placeholder="Digite seu melhor nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
              value={name}
            />

            <View style={{ padding: 20 }}>
              <Button onPress={handleSubmit} title="Confirmar" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
