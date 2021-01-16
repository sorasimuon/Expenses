import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9002",
  baseURL: "https://service-expenses-bck.herokuapp.com",
});

export default instance;
