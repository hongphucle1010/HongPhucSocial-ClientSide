import { useEffect, useRef, useState } from "react";
import { concatFirstAndLastName } from "../../../utils/functions";
import { useParams } from "react-router-dom";
import { getMessages } from "../../../api/message";
import { useSelector } from "react-redux";
import { joinMessageRoom } from "../../../socket.io/message";
import { socket } from "../../../socket.io";
import ScrollToBottomButton from "../../../components/ScrollToBottomButton";
import { LeftMessageElement, RightMessageElement } from "./MessageElement";
import MessageTypingArea from "./MessageTypingArea";
import { SOCKET_RECEIVE_MESSAGE } from "../../../config/socketSignal";

interface MessageObject {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: Date;
}

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
    socket.on(SOCKET_RECEIVE_MESSAGE, processReceiveMessage);
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatBox) {
        chatBox.removeEventListener("scroll", handleScroll);
      }
      socket.off(SOCKET_RECEIVE_MESSAGE, processReceiveMessage);
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
