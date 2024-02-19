import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { Provider } from "react-redux";
// import store from "./redux/store";
import ScrollToTop from "./ScrollRestoration";

import createSagaMiddleware from "@redux-saga/core";
import rootReducer, { rootSaga } from "./redux";
import { applyMiddleware, compose, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const sagaMiddleware = createSagaMiddleware();
const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <ScrollToTop />
        <GlobalStyles />
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
