import axios from "axios";

const MY_IP = "YOUR_IP" || "localhost"
const PORT = "3333"

const api = axios.create({
  baseURL: `http://${MY_IP}:${PORT}`,
});

export default api;
