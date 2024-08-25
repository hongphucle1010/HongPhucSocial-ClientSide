import { socket } from ".";
import { getRoomName } from "../utils/functions";
import {
  SOCKET_JOIN_MESSAGE_LIST_ROOM,
  SOCKET_JOIN_MESSAGE_ROOM,
  SOCKET_LEAVE_MESSAGE_ROOM,
  SOCKET_SEND_MESSAGE,
} from "../config/socketSignal";

export function joinMessageRoom(userId1: number, userId2: number) {
  socket.emit(SOCKET_JOIN_MESSAGE_ROOM, getRoomName(userId1, userId2));
}

export function leaveMessageRoom(userId1: number, userId2: number) {
  socket.emit(SOCKET_LEAVE_MESSAGE_ROOM, getRoomName(userId1, userId2));
}

export function joinMessageListRoom(userId: number) {
  socket.emit(SOCKET_JOIN_MESSAGE_LIST_ROOM, `list_${userId}`);
}

export function leaveMessageListRoom(userId: number) {
  socket.emit(SOCKET_LEAVE_MESSAGE_ROOM, `list_${userId}`);
}

export function sendMessageSocket(
  message: string,
  senderId: number,
  receiverId: number
) {
  socket.emit(SOCKET_SEND_MESSAGE, { message, senderId, receiverId });
}
