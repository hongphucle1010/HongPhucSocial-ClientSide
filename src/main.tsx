import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import configurePersistedStore from "./lib/redux/store/index.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Flowbite } from "flowbite-react";
import "./index.css";
import "flowbite";
import { connectSocket } from "./socket.io";

connectSocket();

const { store, persistor } = configurePersistedStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Flowbite>
          <App />
        </Flowbite>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
