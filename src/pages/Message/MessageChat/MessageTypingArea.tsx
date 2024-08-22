import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { sendMessageSocket } from "../../../socket.io/message";

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

export default MessageTypingArea;
