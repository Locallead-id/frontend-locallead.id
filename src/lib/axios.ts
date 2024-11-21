import axios from "axios";

const BASE_URL = "http://localhost:3001/api"; // change depending on backend server

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
