import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./components/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducers";
import logger from "./middlewave/logger";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
