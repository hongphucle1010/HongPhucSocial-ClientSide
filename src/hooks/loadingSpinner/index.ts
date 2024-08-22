import { useState } from "react";

type UseLoadingSpinner = [JSX.Element, () => void];

export const useLoadingSpinner = (
  normalState: JSX.Element,
  loadingState: JSX.Element
): UseLoadingSpinner => {
  const [btnText, setBtnText] = useState<JSX.Element>(normalState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLoading = () => {
    setBtnText(isLoading ? normalState : loadingState);
    setIsLoading(!isLoading);
  };

  return [btnText, toggleLoading];
};
