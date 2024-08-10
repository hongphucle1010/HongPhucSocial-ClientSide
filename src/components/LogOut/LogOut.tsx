import { useEffect } from "react";
import { logOut } from "../../utils/authentication/authentication";
import { useDispatch } from "react-redux";

const LogOut: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    logOut(dispatch);
    window.location.href = "/";
  });
  return <></>;
};

export default LogOut;
