import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import configurePersistedStore from "./redux/store/index.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./index.css";

const { store, persistor } = configurePersistedStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
