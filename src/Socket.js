import { io } from "socket.io-client";
const token = localStorage.getItem("Token");

const socket = io("https://hrportal-kzxr6.ondigitalocean.app/", {
  query: {
    cookie: token,
  },
});

export default socket;
