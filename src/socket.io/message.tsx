import { socket } from ".";
import { getRoomName } from "../utils/functions";

export function joinMessageRoom(userId1: number, userId2: number) {
  socket.emit("joinMessageRoom", getRoomName(userId1, userId2));
}

export function sendMessageSocket(
  message: string,
  senderId: number,
  receiverId: number
) {
  socket.emit("sendMessage", { message, senderId, receiverId });
}
