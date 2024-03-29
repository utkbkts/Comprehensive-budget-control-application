import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { StateContextProvider } from "./context/Context.jsx";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContextProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </StateContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
