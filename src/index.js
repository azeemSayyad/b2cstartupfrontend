import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import slice from "./state/index.js";
import { Provider } from "react-redux";

import { ThemeProvider } from "@material-tailwind/react";

const store = configureStore({ reducer: slice });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
