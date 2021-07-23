import axios from "axios";

const instance = axios.create({
  baseURL: "https://facebook-mern-messanger.herokuapp.com",
});

export default instance;
