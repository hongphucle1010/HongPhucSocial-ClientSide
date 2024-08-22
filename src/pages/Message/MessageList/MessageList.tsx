import { useEffect, useState } from "react";
import { getChatList } from "../../../api/message";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import MyLoading from "../../../components/MyLoading";
import { socket } from "../../../socket.io";
import { SOCKET_RECEIVE_MESSAGE } from "../../../config/socketSignal";
import { useSelector } from "react-redux";
import {
  joinMessageListRoom,
  leaveMessageListRoom,
} from "../../../socket.io/message";
import { ChatListProfile, MessageObject } from "../types";
import { convertTime } from "../../../utils/functions";

const ChatList = () => {
  const currentUser = useSelector((state: any) => state.userRole.value.user);
  const [contactList, setContactList] = useState<ChatListProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const processReceiveMessage = (message: MessageObject) => {
    // Create a new list by mapping over the contactList
    const newMessageList: ChatListProfile[] = contactList.map(
      (contact: ChatListProfile) => {
        if (contact.userId === message.senderId) {
          // If the contact matches the sender, update the content and createdAt
          return {
            ...contact,
            content: message.content,
            createdAt: message.createdAt,
          };
        }
        // Otherwise, return the contact as it is
        return contact;
      }
    );

    // Move the updated contact to the beginning of the list
    const updatedContactIndex = newMessageList.findIndex(
      (contact) => contact.userId === message.senderId
    );
    if (updatedContactIndex !== -1) {
      const [updatedContact] = newMessageList.splice(updatedContactIndex, 1);
      newMessageList.unshift(updatedContact);
    }
    // Set the updated list as the new state
    setContactList(newMessageList);
  };

  useEffect(() => {
    joinMessageListRoom(currentUser.id);
    getChatList()
      .then((response) => {
        setContactList(response.data ?? []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    socket.on(SOCKET_RECEIVE_MESSAGE, processReceiveMessage);
    return () => {
      socket.off(SOCKET_RECEIVE_MESSAGE, processReceiveMessage);
      leaveMessageListRoom(currentUser.id);
    };
  }, []);

  useEffect(() => {
    console.log(contactList);
  }, [contactList]);

  const ContactList: React.FC = () => {
    return isLoading ? (
      <MyLoading />
    ) : (
      <div>
        {contactList.map((contact) => (
          <div
            key={contact.userId}
            className="flex w-full p-3 gap-3 active:scale-95 active:rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all myPointer"
            onClick={() => navigate(`/message/${contact.userId}`)}
          >
            <Avatar img={contact.avatarUrl} rounded />
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <p className="font-bold">{`${contact.firstName} ${contact.lastName}`}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {convertTime(contact.createdAt)}
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{`${contact.content}`}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <ContactList />
    </div>
  );
};

export default ChatList;
