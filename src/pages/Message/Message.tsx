import { Avatar, Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { concatFirstAndLastName, convertTime } from "../../utils/functions";
import { Link, useParams } from "react-router-dom";
import { getMessages } from "../../api/message";
import { useSelector } from "react-redux";
import { joinMessageRoom, sendMessageSocket } from "../../socket.io/message";
import { socket } from "../../socket.io";

interface MessageObject {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: Date;
}

const ScrollToBottomButton = ({ scrollToBottom }: any) => {
  return (
    <button
      onClick={scrollToBottom}
      className="p-0 fixed z-20 bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 active:text-blue-700 dark:active:text-cyan-500"
    >
      <FaArrowCircleDown className="text-3xl opacity-30" />
    </button>
  );
};

const LeftMessageElement = ({ name, date, text, avatarUrl, username }: any) => {
  return (
    <div className="flex gap-2.5 w-5/6 sm:w-4/6">
      <Link to={`/profile/${username}`}>
        <Avatar rounded className="self-start" img={avatarUrl} />
      </Link>
      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
            {convertTime(date)}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {text}
        </p>
      </div>
    </div>
  );
};

const RightMessageElement = ({ date, text, avatarUrl }: any) => {
  return (
    <div className="flex gap-2.5 w-5/6 sm:w-4/6 self-end">
      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-blue-500 rounded-s-xl rounded-es-xl dark:bg-blue-600">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-white">You</span>
          <span className="text-sm font-normal text-gray-200">
            {convertTime(date)}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-white">{text}</p>
      </div>
      <Avatar rounded className="self-start" img={avatarUrl} />
    </div>
  );
};

// Fake fetch function
// const fetchOlderMessages = () => {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 2000);
//   });
// };

export default function Message() {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const userId = parseInt(useParams().id as string);
  const currentUser = useSelector((state: any) => state.userRole.value.user);
  const [userProfile, setUserProfile] = useState<any>({});

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  // const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  const [messageList, setMessageList] = useState<MessageObject[]>([]);

  const handleScroll = () => {
    if (chatBoxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
      setIsAtBottom(scrollHeight - scrollTop < clientHeight + 100);
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      setIsAtBottom(true);
    }
  };

  useEffect(() => {
    joinMessageRoom(currentUser.id, userId);
    getMessages(userId)
      .then((response) => {
        setMessageList(response.data.messageList);
        setUserProfile(response.data.userProfile);
      })
      .catch((error) => {
        console.error(error);
      });

    const processReceiveMessage = (message: MessageObject) => {
      console.log("Message received: ", message);
      setMessageList((prev) => [...prev, message]);
    };
    socket.on("getMessage", processReceiveMessage);
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatBox) {
        chatBox.removeEventListener("scroll", handleScroll);
      }
      socket.off("getMessage", processReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div
          className="overflow-y-scroll grow-0 pt-16"
          style={{
            height: "calc(100vh - 4rem)",
          }}
          ref={chatBoxRef}
        >
          <div className="p-2 flex flex-col gap-3">
            {messageList.map((message) =>
              message.senderId === userId ? (
                <LeftMessageElement
                  key={message.id}
                  date={message.createdAt}
                  name={concatFirstAndLastName(
                    userProfile?.firstName || "",
                    userProfile?.lastName || ""
                  )}
                  text={message.content}
                  avatarUrl={userProfile?.avatarUrl}
                  username={userProfile.user?.username}
                />
              ) : (
                <RightMessageElement
                  key={message.id}
                  date={message.createdAt}
                  text={message.content}
                  avatarUrl={currentUser?.profile?.avatarUrl}
                />
              )
            )}
          </div>
        </div>
        <MessageTypingArea senderId={currentUser.id} receiverId={userId} />
        {!isAtBottom && (
          <ScrollToBottomButton scrollToBottom={scrollToBottom} />
        )}
      </div>
    </>
  );
}

const MessageTypingArea = React.memo(({ senderId, receiverId }: any) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    console.log(message);
    sendMessageSocket(message, senderId, receiverId);
    setMessage("");
  };

  useEffect(() => {
    const pressEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    };
    const input = inputRef.current;
    if (input) {
      input.focus();
      input.addEventListener("keydown", pressEnter);
    }
    return () => {
      if (input) {
        input.removeEventListener("keydown", pressEnter);
      }
    };
  }, [message]);

  return (
    <div className="my-0 h-16 flex items-center gap-2.5 p-2.5 border-t border-gray-200 bg-gray-100 dark:bg-gray-700">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message"
        className="flex-1 p-2.5 border border-gray-200 rounded-xl dark:border-gray-700 dark:bg-gray-800"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <Button
        color="purple"
        className="px-0 active:bg-blue-500"
        onClick={() => {
          sendMessage();
        }}
      >
        <LuSendHorizonal />
      </Button>
    </div>
  );
});
