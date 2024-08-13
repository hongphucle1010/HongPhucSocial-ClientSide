import { useEffect, useState } from "react";
import { getChatList } from "../../api/message";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import MyLoading from "../../components/MyLoading";

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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getChatList()
      .then((response) => {
        console.log(response.data);
        setContactList(response.data ?? []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            <div>
              <p className="font-bold">{`${contact.firstName} ${contact.lastName}`}</p>
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
