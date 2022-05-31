import axios from "axios";
import { Platform } from "react-native";

const HOST = Platform.OS === "android" ? "YOUR_IP" : "localhost"
const PORT = "3333"

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});

export default api;
