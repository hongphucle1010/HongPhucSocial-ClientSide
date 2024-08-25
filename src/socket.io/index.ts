import { io } from "socket.io-client";
import { socketHost } from "../config/apiPath";
import { SOCKET_CONNECT, SOCKET_DISCONNECT } from "../config/socketSignal";

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
  socket.on(SOCKET_CONNECT, () => {
    console.log("Connected to socket.io server");
  });

  socket.on(SOCKET_DISCONNECT, () => {
    console.log("Disconnected from socket.io server");
  });
}
