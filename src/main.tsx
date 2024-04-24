import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "../src/components/App";
import { Provider } from "react-redux";
import { store } from "./store";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}