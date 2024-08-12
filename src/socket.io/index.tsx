import { io } from "socket.io-client";
import { socketHost } from "../config/api/api";

export const socket = io(socketHost, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ["websocket"],
  upgrade: false,
  query: {
    token: localStorage.getItem("token"),
  },
});

export function connectSocket() {
  socket.on("connect", () => {
    console.log("Connected to socket.io server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io server");
  });
}