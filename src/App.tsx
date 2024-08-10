import "./App.css";
import Router from "./routes";
import React from "react";
import { initStatus } from "./utils/authentication/authentication";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    initStatus(dispatch);
  }, [dispatch]);
  return <Router />;
};

export default App;
