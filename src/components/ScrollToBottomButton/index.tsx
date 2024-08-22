import { FaArrowCircleDown } from "react-icons/fa";

const ScrollToBottomButton = ({
  scrollToBottom,
}: {
  scrollToBottom: () => void;
}) => {
  return (
    <button
      onClick={scrollToBottom}
      className="p-0 fixed z-20 bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 active:text-blue-700 dark:active:text-cyan-500"
    >
      <FaArrowCircleDown className="text-3xl opacity-30" />
    </button>
  );
};

export default ScrollToBottomButton;
