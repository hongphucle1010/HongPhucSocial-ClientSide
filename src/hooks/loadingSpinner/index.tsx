import { useState } from "react";

type UseLoadingSpinner = {
  btnText: JSX.Element;
  toggleLoading: () => void;
  isLoading: boolean;
};

export const useLoadingSpinner = (
  normalState: JSX.Element,
  loadingState: JSX.Element
): UseLoadingSpinner => {
  const [btnText, setBtnText] = useState<JSX.Element>(normalState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLoading = () => {
    setIsLoading((prev) => {
      setBtnText(prev ? normalState : loadingState);
      return !prev;
    });
  };

  return { btnText, toggleLoading, isLoading };
};
