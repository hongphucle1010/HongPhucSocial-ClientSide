import { Alert } from "flowbite-react";

const MyAlert = ({ color, onDismiss, content, isShow }: any) => {
  return (
    <Alert
      color={color}
      onDismiss={onDismiss}
      className={`fixed bottom-2 right-2 z-20 w-64 transition-all duration-300 ease-in-out
    ${
      isShow
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-5 pointer-events-none"
    }`}
    >
      <span>{content}</span>
    </Alert>
  );
};

export default MyAlert;
