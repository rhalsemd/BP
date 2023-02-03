import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, rootSaga } from "./modules/index";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   type: "dark",
  // },
  // typography: {
  //   fontSize: 12,
  // },
  // overrides: {
  //   MuiTypography: {
  //     colorInherit: {
  //       color: "#fff",
  //     },
  //   },
  // },
});

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
