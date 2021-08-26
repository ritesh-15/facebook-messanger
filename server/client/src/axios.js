import axios from "axios";

const instance = axios.create({
  // baseURL: "https://facebook-mern-messanger.herokuapp.com",
  baseURL: "http://localhost:9000",
});

export default instance;
