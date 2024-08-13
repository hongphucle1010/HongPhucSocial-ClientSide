import { useEffect, useState } from "react";
import { getChatList } from "../../api/message";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

interface ChatListProfile {
  userId: number;
  content: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  avatarUrl: string;
}

const ChatList = () => {
  const [contactList, setContactList] = useState<ChatListProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getChatList()
      .then((response) => {
        setContactList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {contactList.map((contact) => (
        <div
          key={contact.userId}
          className="flex w-full p-3 gap-3 active:scale-95 active:rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all myPointer"
          onClick={() => navigate(`/message/${contact.userId}`)}
        >
          <Avatar img={contact.avatarUrl} rounded />
          <div>
            <p className="font-bold">{`${contact.firstName} ${contact.lastName}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{`${contact.content}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
